// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { Disposable } from "vscode";

class DecorationProvider implements vscode.FileDecorationProvider {
    private disposables: Disposable[];
    private decoration: vscode.FileDecoration = new vscode.FileDecoration("", "has conflicts", new vscode.ThemeColor("inputValidation.warningBorder"));
    constructor() {
        this.disposables = [];
        this.decoration.propagate = true;
        this.disposables.push(vscode.window.registerFileDecorationProvider(this));
    }

    public provideFileDecoration(uri: vscode.Uri): vscode.ProviderResult<vscode.FileDecoration> {
        const endWithMessage: string | undefined = uri.toString().split("/").pop();
        if (endWithMessage === "hasConflict") {
            return this.decoration;
        } else {
            return null;
        }
    }
    public dispose(): void {
        this.disposables.forEach(d => d.dispose());
    }
}

export const decorationProvider: DecorationProvider = new DecorationProvider();
