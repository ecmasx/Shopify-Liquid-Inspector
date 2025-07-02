import * as vscode from "vscode";
import { LiquidHoverProvider } from "./providers/hoverProvider";

export function activate(context: vscode.ExtensionContext) {
  const hoverProvider = new LiquidHoverProvider();

  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      [
        { scheme: "file", language: "liquid" },
        { scheme: "file", pattern: "**/*.liquid" },
      ],
      hoverProvider
    )
  );
}

export function deactivate() {}
