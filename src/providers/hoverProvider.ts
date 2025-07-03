import * as vscode from "vscode";
import { ShopifyObjectRegistry } from "../schemas/shopifyObjects";
import { ShopifyFilterRegistry } from "../schemas/shopifyFilters";
import { ShopifyTagRegistry } from "../schemas/shopifyTags";
import { LiquidParser } from "../parsers/liquidParser";

export class LiquidHoverProvider implements vscode.HoverProvider {
  private registry: ShopifyObjectRegistry;
  private filterRegistry: ShopifyFilterRegistry;
  private tagRegistry: ShopifyTagRegistry;
  private parser: LiquidParser;

  constructor() {
    this.registry = new ShopifyObjectRegistry();
    this.filterRegistry = new ShopifyFilterRegistry();
    this.tagRegistry = new ShopifyTagRegistry();
    this.parser = new LiquidParser();
  }

  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
    const config = vscode.workspace.getConfiguration("liquidInspector");
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
          return new vscode.Hover(markdown, filter.range);
        }
      }
    }

    if (config.get("enableTagHover", true)) {
      const tag = this.parser.getTagAtPosition(line.text, position.character);
      if (tag) {
        const tagInfo = this.tagRegistry.getTag(tag.name);
        if (tagInfo) {
          const markdown = this.createTagHoverContent(tag, tagInfo, config);
          return new vscode.Hover(markdown, tag.range);
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

    return new vscode.Hover(markdown, variable.range);
  }

  private createFilterHoverContent(
    filter: any,
    filterInfo: any,
    config: vscode.WorkspaceConfiguration
  ): vscode.MarkdownString {
    const md = new vscode.MarkdownString();
    md.isTrusted = true;
    md.supportHtml = true;

    md.appendMarkdown(`## \`${filter.name}\` Filter\n\n`);
    md.appendMarkdown(`**Category:** ${filterInfo.category}\n\n`);

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

    if (filter.parameters && filter.parameters.length > 0) {
      md.appendMarkdown("---\n\n");
      md.appendMarkdown("### Current Parameters\n\n");
      filter.parameters.forEach((param: string, index: number) => {
        md.appendMarkdown(`${index + 1}. \`${param}\`\n`);
      });
      md.appendMarkdown("\n");
    }

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

    return md;
  }

  private createTagHoverContent(
    tag: any,
    tagInfo: any,
    config: vscode.WorkspaceConfiguration
  ): vscode.MarkdownString {
    const md = new vscode.MarkdownString();
    md.isTrusted = true;
    md.supportHtml = true;

    md.appendMarkdown(`## \`${tag.name}\` Tag\n\n`);
    md.appendMarkdown(`**Category:** ${tagInfo.category}\n\n`);

    if (config.get("showDescription", true) && tagInfo.description) {
      md.appendMarkdown(`*${tagInfo.description}*\n\n`);
    }
    if (tagInfo.syntax) {
      md.appendMarkdown(`**Syntax:** \`${tagInfo.syntax}\`\n\n`);
    }
    if (config.get("showDeprecatedWarnings", true) && tagInfo.deprecated) {
      md.appendMarkdown(
        `⚠️ **Deprecated:** This tag is deprecated and should be avoided.\n\n`
      );
    }

    if (tagInfo.endTag) {
      md.appendMarkdown(`**End Tag:** \`{% ${tagInfo.endTag} %}\`\n\n`);
    } else if (tagInfo.selfClosing) {
      md.appendMarkdown(`**Type:** Self-closing tag\n\n`);
    }

    if (
      config.get("showTagParameters", true) &&
      tagInfo.parameters &&
      Object.keys(tagInfo.parameters).length > 0
    ) {
      md.appendMarkdown("---\n\n");
      md.appendMarkdown("### Parameters\n\n");

      md.appendMarkdown("| Parameter | Type | Description | Required |\n");
      md.appendMarkdown("|-----------|------|-------------|----------|\n");

      Object.entries(tagInfo.parameters).forEach(
        ([name, param]: [string, any]) => {
          const type = param.type || "string";
          const description = param.description || "";
          const required = param.required ? "✓" : "";
          md.appendMarkdown(
            `| \`${name}\` | \`${type}\` | ${description} | ${required} |\n`
          );
        }
      );
    }

    if (tag.parameters && tag.parameters.length > 0) {
      md.appendMarkdown("---\n\n");
      md.appendMarkdown("### Current Parameters\n\n");
      tag.parameters.forEach((param: string, index: number) => {
        md.appendMarkdown(`${index + 1}. \`${param}\`\n`);
      });
      md.appendMarkdown("\n");
    }

    if (
      config.get("showTagExamples", true) &&
      tagInfo.examples &&
      tagInfo.examples.length > 0
    ) {
      md.appendMarkdown("---\n\n");
      md.appendMarkdown("### Examples\n\n");
      tagInfo.examples.forEach((example: string) => {
        md.appendMarkdown(`\`\`\`liquid\n${example}\n\`\`\`\n\n`);
      });
    }

    return md;
  }

  private createVariableHoverContent(
    variable: any,
    objectInfo: any,
    config: vscode.WorkspaceConfiguration
  ): vscode.MarkdownString {
    const md = new vscode.MarkdownString();
    md.isTrusted = true;
    md.supportHtml = true;

    md.appendMarkdown(`## \`${variable.fullPath}\`\n\n`);

    if (config.get("showTypes", true)) {
      md.appendMarkdown(`**Type:** \`${objectInfo.type}\`\n\n`);
    }

    if (config.get("showDescription", true) && objectInfo.description) {
      md.appendMarkdown(`*${objectInfo.description}*\n\n`);
    }

    if (config.get("showDeprecatedWarnings", true) && objectInfo.deprecated) {
      md.appendMarkdown(`⚠️ **Deprecated:** ${objectInfo.deprecated}\n\n`);
    }

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

    return md;
  }

  private getPropertyInfo(objectInfo: any, propertyPath: string[]): any {
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
