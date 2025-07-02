import * as vscode from "vscode";
import { ShopifyObjectRegistry } from "../schemas/shopifyObjects";
import { LiquidParser } from "../parsers/liquidParser";

export class LiquidHoverProvider implements vscode.HoverProvider {
  private registry: ShopifyObjectRegistry;
  private parser: LiquidParser;

  constructor() {
    this.registry = new ShopifyObjectRegistry();
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

    const markdown = this.createHoverContent(variable, objectInfo, config);

    return new vscode.Hover(markdown, variable.range);
  }

  private createHoverContent(
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
        md.appendMarkdown(
          `| \`${name}\` | \`${typeStr}\` | ${description} |\n`
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
