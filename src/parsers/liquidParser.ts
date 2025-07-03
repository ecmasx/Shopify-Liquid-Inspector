import * as vscode from "vscode";

export interface LiquidVariable {
  rootName: string;
  fullPath: string;
  propertyPath: string[];
  range: vscode.Range;
}

export interface LiquidFilter {
  name: string;
  parameters: string[];
  range: vscode.Range;
}

export interface LiquidExpression {
  variables: LiquidVariable[];
  filters: LiquidFilter[];
  type: "output" | "tag";
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

  getFilterAtPosition(text: string, position: number): LiquidFilter | null {
    const liquidExpressions = this.findLiquidExpressions(text);

    for (const expr of liquidExpressions) {
      if (position >= expr.start && position <= expr.end) {
        const filters = this.parseFiltersInExpression(expr.content);
        const relativePosition = position - expr.start;

        for (const filter of filters) {
          // Find filter position within the expression
          const filterStart = expr.content.indexOf(filter.name);
          const filterEnd = filterStart + filter.name.length;

          if (
            relativePosition >= filterStart &&
            relativePosition <= filterEnd
          ) {
            return {
              ...filter,
              range: new vscode.Range(
                new vscode.Position(0, expr.start + filterStart),
                new vscode.Position(0, expr.start + filterEnd)
              ),
            };
          }
        }
      }
    }

    return null;
  }

  parseExpressionAtPosition(
    text: string,
    position: number
  ): LiquidExpression | null {
    const liquidExpressions = this.findLiquidExpressions(text);

    for (const expr of liquidExpressions) {
      if (position >= expr.start && position <= expr.end) {
        const variables = this.parseVariablesInExpression(expr.content).map(
          (variable) => ({
            ...variable,
            range: new vscode.Range(
              new vscode.Position(0, expr.start),
              new vscode.Position(0, expr.end)
            ),
          })
        );

        const filters = this.parseFiltersInExpression(expr.content).map(
          (filter) => ({
            ...filter,
            range: new vscode.Range(
              new vscode.Position(0, expr.start),
              new vscode.Position(0, expr.end)
            ),
          })
        );

        return {
          variables,
          filters,
          type: expr.content.startsWith("{{") ? "output" : "tag",
        };
      }
    }

    return null;
  }

  extractVariablesFromExpression(
    content: string
  ): Array<Omit<LiquidVariable, "range">> {
    return this.parseVariablesInExpression(content);
  }

  extractFiltersFromExpression(
    content: string
  ): Array<Omit<LiquidFilter, "range">> {
    return this.parseFiltersInExpression(content);
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

  private parseVariablesInExpression(
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

  private parseFiltersInExpression(
    content: string
  ): Array<Omit<LiquidFilter, "range">> {
    const filters = [];
    const parts = content.split("|");

    // Skip the first part (it's the variable)
    for (let i = 1; i < parts.length; i++) {
      const filterPart = parts[i].trim();
      const colonIndex = filterPart.indexOf(":");

      let filterName: string;
      let parameters: string[] = [];

      if (colonIndex > -1) {
        filterName = filterPart.substring(0, colonIndex).trim();
        const paramString = filterPart.substring(colonIndex + 1).trim();

        // Parse parameters (simple implementation)
        if (paramString) {
          parameters = paramString
            .split(",")
            .map((p) => p.trim().replace(/['"]/g, ""));
        }
      } else {
        filterName = filterPart;
      }

      if (filterName) {
        filters.push({
          name: filterName,
          parameters,
        });
      }
    }

    return filters;
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
