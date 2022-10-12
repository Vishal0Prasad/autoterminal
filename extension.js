// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let disposable = [];
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	if (vscode.workspace.workspaceFolders !== undefined) {
		let f = vscode.workspace.workspaceFolders[0].uri.fsPath;
		const file = new vscode.Uri("file", "", f + "/autoterminal.json");
		vscode.workspace.openTextDocument(file).then((document) => {
			let text = document.getText();
			console.log(document, text);
		});
	}

	disposable.push(
		vscode.commands.registerCommand("auto-terminal.newTerminal", function () {
			vscode.window.createTerminal();
		})
	);

	//  disposable.push(
	//  	vscode.commands.registerCommand("")
	// )

	disposable.forEach(() => {
		context.subscriptions.push(disposable);
	});
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
