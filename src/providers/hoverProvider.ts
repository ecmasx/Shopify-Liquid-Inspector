import * as vscode from "vscode";
import {
  ShopifyObjectRegistry,
  ShopifyObjectDefinition,
} from "../schemas/shopifyObjects";
import {
  ShopifyFilterRegistry,
  ShopifyFilterDefinition,
} from "../schemas/shopifyFilters";
import {
  LiquidParser,
  LiquidFilter,
  LiquidVariable,
} from "../parsers/liquidParser";

export class LiquidHoverProvider implements vscode.HoverProvider {
  private registry: ShopifyObjectRegistry;
  private filterRegistry: ShopifyFilterRegistry;
  private parser: LiquidParser;
  private hoverCache = new Map<string, vscode.Hover>();
  private configCache: vscode.WorkspaceConfiguration | null = null;
  private configCacheTime = 0;
  private static readonly MAX_CACHE_SIZE = 100;
  private static readonly CONFIG_CACHE_DURATION = 5000; // 5 seconds

  constructor(
    registry?: ShopifyObjectRegistry,
    filterRegistry?: ShopifyFilterRegistry,
    parser?: LiquidParser
  ) {
    this.registry = registry || new ShopifyObjectRegistry();
    this.filterRegistry = filterRegistry || new ShopifyFilterRegistry();
    this.parser = parser || new LiquidParser();
  }

  private getConfig(): vscode.WorkspaceConfiguration {
    const now = Date.now();
    if (
      !this.configCache ||
      now - this.configCacheTime > LiquidHoverProvider.CONFIG_CACHE_DURATION
    ) {
      this.configCache = vscode.workspace.getConfiguration("liquidInspector");
      this.configCacheTime = now;
    }
    return this.configCache;
  }

  private cleanupCache(): void {
    if (this.hoverCache.size > LiquidHoverProvider.MAX_CACHE_SIZE) {
      const entries = Array.from(this.hoverCache.entries());
      const toDelete = entries.slice(
        0,
        entries.length - LiquidHoverProvider.MAX_CACHE_SIZE
      );
      toDelete.forEach(([key]) => this.hoverCache.delete(key));
    }
  }

  async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.Hover | null> {
    try {
      if (token.isCancellationRequested) {
        return null;
      }

      const cacheKey = `${document.uri.toString()}:${position.line}:${
        position.character
      }`;
      if (this.hoverCache.has(cacheKey)) {
        return this.hoverCache.get(cacheKey) || null;
      }

      const config = this.getConfig();
      if (!config.get("enabled", true)) {
        return null;
      }

      const line = document.lineAt(position.line);

      if (config.get("enableFilterHover", true)) {
        const filter = this.parser.getFilterAtPosition(
          line.text,
          position.character
        );
        if (filter) {
          const filterInfo = this.filterRegistry.getFilter(filter.name);
          if (filterInfo) {
            const markdown = this.createFilterHoverContent(
              filter,
              filterInfo,
              config
            );
            const result = new vscode.Hover(markdown, filter.range);
            this.hoverCache.set(cacheKey, result);
            this.cleanupCache();
            return result;
          }
        }
      }

      const variable = this.parser.getVariableAtPosition(
        line.text,
        position.character
      );

      if (!variable) {
        return null;
      }

      const objectInfo = this.registry.getObject(variable.rootName);
      if (!objectInfo) {
        return null;
      }

      const markdown = this.createVariableHoverContent(
        variable,
        objectInfo,
        config
      );

      const result = new vscode.Hover(markdown, variable.range);
      this.hoverCache.set(cacheKey, result);
      this.cleanupCache();
      return result;
    } catch (error) {
      console.error("LiquidHoverProvider error:", error);
      return null;
    }
  }

  private createFilterHoverContent(
    filter: LiquidFilter,
    filterInfo: ShopifyFilterDefinition,
    config: vscode.WorkspaceConfiguration
  ): vscode.MarkdownString {
    const md = new vscode.MarkdownString();
    md.isTrusted = true;
    md.supportHtml = true;

    this.addFilterHeader(md, filter, filterInfo);
    this.addFilterDescription(md, filterInfo, config);
    this.addFilterParameters(md, filterInfo, config);
    this.addCurrentParameters(md, filter);
    this.addFilterExamples(md, filterInfo, config);

    return md;
  }

  private addFilterHeader(
    md: vscode.MarkdownString,
    filter: LiquidFilter,
    filterInfo: ShopifyFilterDefinition
  ): void {
    md.appendMarkdown(`## \`${filter.name}\` Filter\n\n`);
    md.appendMarkdown(`**Category:** ${filterInfo.category}\n\n`);
  }

  private addFilterDescription(
    md: vscode.MarkdownString,
    filterInfo: ShopifyFilterDefinition,
    config: vscode.WorkspaceConfiguration
  ): void {
    if (config.get("showDescription", true) && filterInfo.description) {
      md.appendMarkdown(`*${filterInfo.description}*\n\n`);
    }

    if (config.get("showTypes", true) && filterInfo.returnType) {
      md.appendMarkdown(`**Returns:** \`${filterInfo.returnType}\`\n\n`);
    }

    if (filterInfo.syntax) {
      md.appendMarkdown(`**Syntax:** \`${filterInfo.syntax}\`\n\n`);
    }

    if (config.get("showDeprecatedWarnings", true) && filterInfo.deprecated) {
      md.appendMarkdown(
        `⚠️ **Deprecated:** This filter is deprecated and should be avoided.\n\n`
      );
    }
  }

  private addFilterParameters(
    md: vscode.MarkdownString,
    filterInfo: ShopifyFilterDefinition,
    config: vscode.WorkspaceConfiguration
  ): void {
    if (
      config.get("showFilterParameters", true) &&
      filterInfo.parameters &&
      Object.keys(filterInfo.parameters).length > 0
    ) {
      md.appendMarkdown("---\n\n");
      md.appendMarkdown("### Parameters\n\n");

      md.appendMarkdown("| Parameter | Type | Description | Default |\n");
      md.appendMarkdown("|-----------|------|-------------|--------|\n");

      Object.entries(filterInfo.parameters).forEach(
        ([name, param]: [string, any]) => {
          const type = param.type || "string";
          const description = param.description || "";
          const defaultValue = param.default ? `\`${param.default}\`` : "";
          md.appendMarkdown(
            `| \`${name}\` | \`${type}\` | ${description} | ${defaultValue} |\n`
          );
        }
      );
    }
  }

  private addCurrentParameters(
    md: vscode.MarkdownString,
    filter: LiquidFilter
  ): void {
    if (filter.parameters && filter.parameters.length > 0) {
      md.appendMarkdown("---\n\n");
      md.appendMarkdown("### Current Parameters\n\n");
      filter.parameters.forEach((param: string, index: number) => {
        md.appendMarkdown(`${index + 1}. \`${param}\`\n`);
      });
      md.appendMarkdown("\n");
    }
  }

  private addFilterExamples(
    md: vscode.MarkdownString,
    filterInfo: ShopifyFilterDefinition,
    config: vscode.WorkspaceConfiguration
  ): void {
    if (
      config.get("showFilterExamples", true) &&
      filterInfo.examples &&
      filterInfo.examples.length > 0
    ) {
      md.appendMarkdown("---\n\n");
      md.appendMarkdown("### Examples\n\n");
      filterInfo.examples.forEach((example: string) => {
        md.appendMarkdown(`\`\`\`liquid\n${example}\n\`\`\`\n\n`);
      });
    }
  }

  private createVariableHoverContent(
    variable: LiquidVariable,
    objectInfo: ShopifyObjectDefinition,
    config: vscode.WorkspaceConfiguration
  ): vscode.MarkdownString {
    const md = new vscode.MarkdownString();
    md.isTrusted = true;
    md.supportHtml = true;

    this.addVariableHeader(md, variable, objectInfo, config);
    this.addPropertyInfo(md, variable, objectInfo);
    this.addAvailableProperties(md, objectInfo, config);

    return md;
  }

  private addVariableHeader(
    md: vscode.MarkdownString,
    variable: LiquidVariable,
    objectInfo: ShopifyObjectDefinition,
    config: vscode.WorkspaceConfiguration
  ): void {
    md.appendMarkdown(`## \`${variable.fullPath}\`\n\n`);

    if (config.get("showTypes", true)) {
      md.appendMarkdown(`**Type:** \`${objectInfo.type}\`\n\n`);
    }

    if (config.get("showDescription", true) && objectInfo.description) {
      md.appendMarkdown(`*${objectInfo.description}*\n\n`);
    }

    if (config.get("showDeprecatedWarnings", true) && objectInfo.deprecated) {
      md.appendMarkdown(`⚠️ **Deprecated:** This object is deprecated\n\n`);
    }
  }

  private addPropertyInfo(
    md: vscode.MarkdownString,
    variable: LiquidVariable,
    objectInfo: ShopifyObjectDefinition
  ): void {
    if (variable.propertyPath && variable.propertyPath.length > 0) {
      const propertyInfo = this.getPropertyInfo(
        objectInfo,
        variable.propertyPath
      );
      if (propertyInfo) {
        md.appendMarkdown(`**Property Type:** \`${propertyInfo.type}\`\n\n`);
        if (propertyInfo.description) {
          md.appendMarkdown(`**Description:** ${propertyInfo.description}\n\n`);
        }
        if (propertyInfo.deprecated) {
          md.appendMarkdown(
            `⚠️ **Property Deprecated:** ${propertyInfo.deprecated}\n\n`
          );
        }
      }
    }
  }

  private addAvailableProperties(
    md: vscode.MarkdownString,
    objectInfo: ShopifyObjectDefinition,
    config: vscode.WorkspaceConfiguration
  ): void {
    if (
      objectInfo.properties &&
      Object.keys(objectInfo.properties).length > 0
    ) {
      md.appendMarkdown("---\n\n");
      md.appendMarkdown("### Available Properties\n\n");

      const maxProperties = config.get("maxPropertiesInHover", 25);
      const sortedProps = Object.entries(objectInfo.properties)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(0, maxProperties);

      md.appendMarkdown("| Property | Type | Description |\n");
      md.appendMarkdown("|----------|------|-------------|\n");

      sortedProps.forEach(([name, prop]: [string, any]) => {
        const typeStr =
          typeof prop === "object" ? prop.type || "object" : typeof prop;
        const description =
          typeof prop === "object" && prop.description
            ? prop.description.replace(/\|/g, "\\|")
            : "";
        const deprecatedMark =
          typeof prop === "object" && prop.deprecated ? " ⚠️" : "";
        md.appendMarkdown(
          `| \`${name}\`${deprecatedMark} | \`${typeStr}\` | ${description} |\n`
        );
      });

      if (Object.keys(objectInfo.properties).length > maxProperties) {
        md.appendMarkdown(
          `\n*Showing ${maxProperties} of ${
            Object.keys(objectInfo.properties).length
          } properties*\n`
        );
      }
    }
  }

  private getPropertyInfo(
    objectInfo: ShopifyObjectDefinition,
    propertyPath: string[]
  ): any {
    let current = objectInfo.properties;

    for (const prop of propertyPath) {
      if (current && current[prop]) {
        current = current[prop];
      } else {
        return null;
      }
    }

    return current;
  }
}
