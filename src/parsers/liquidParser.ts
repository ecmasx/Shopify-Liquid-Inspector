import * as vscode from "vscode";

export interface LiquidVariable {
  rootName: string;
  fullPath: string;
  propertyPath: string[];
  range: vscode.Range;
}

export class LiquidParser {
  getVariableAtPosition(text: string, position: number): LiquidVariable | null {
    const liquidExpressions = this.findLiquidExpressions(text);

    for (const expr of liquidExpressions) {
      if (position >= expr.start && position <= expr.end) {
        const variable = this.parseVariableInExpression(
          expr.content,
          position - expr.start
        );
        if (variable) {
          return {
            ...variable,
            range: new vscode.Range(
              new vscode.Position(0, expr.start),
              new vscode.Position(0, expr.end)
            ),
          };
        }
      }
    }

    return null;
  }

  extractVariablesFromExpression(
    content: string
  ): Array<Omit<LiquidVariable, "range">> {
    const variables = [];

    const beforeFilters = content.split("|")[0].trim();

    const variableMatches = beforeFilters.matchAll(
      /\b([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)\b/g
    );

    for (const match of variableMatches) {
      const fullPath = match[1];
      const parts = fullPath.split(".");
      const rootName = parts[0];
      const propertyPath = parts.slice(1);

      variables.push({
        rootName,
        fullPath,
        propertyPath,
      });
    }

    return variables;
  }

  isInsideLiquidExpression(text: string): boolean {
    const openBraces = (text.match(/\{\{/g) || []).length;
    const closeBraces = (text.match(/\}\}/g) || []).length;
    const openTags = (text.match(/\{%/g) || []).length;
    const closeTags = (text.match(/%\}/g) || []).length;

    return openBraces > closeBraces || openTags > closeTags;
  }

  getVariableBeforeDot(text: string): string | null {
    const match = text.match(/(\w+)\.$/);
    return match ? match[1] : null;
  }

  private findLiquidExpressions(
    text: string
  ): Array<{ start: number; end: number; content: string }> {
    const expressions = [];
    const regex = /\{\{([^}]*)\}\}|\{%([^%]*)%\}/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      expressions.push({
        start: match.index,
        end: match.index + match[0].length,
        content: (match[1] || match[2]).trim(),
      });
    }

    return expressions;
  }

  private parseVariableInExpression(
    content: string,
    position: number
  ): Omit<LiquidVariable, "range"> | null {
    const beforeFilters = content.split("|")[0].trim();

    const variableMatch = beforeFilters.match(
      /\b([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)\b/
    );

    if (variableMatch) {
      const fullPath = variableMatch[1];
      const parts = fullPath.split(".");
      const rootName = parts[0];
      const propertyPath = parts.slice(1);

      return {
        rootName,
        fullPath,
        propertyPath,
      };
    }

    return null;
  }
}
