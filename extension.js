// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode"); // This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let disposable = [];
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let autoTerminalConfig = null;
	console.log("I'm alive!");
	async function readAutoTerminalConfig() {
		let f = vscode.workspace.workspaceFolders[0].uri.fsPath;
		let file = new vscode.Uri("file", "", f + "/autoterminal.json");
		const promise1 = await vscode.workspace
			.openTextDocument(file)
			.then((document) => {
				return document.getText();
			});
		return promise1;
	}

	if (vscode.workspace.workspaceFolders !== undefined) {
		autoTerminalConfig = readAutoTerminalConfig();
		autoTerminalConfig.then((value) => {
			console.log(value);
		});
	}

	disposable.push(
		vscode.commands.registerCommand(
			"auto-terminal.createTerminal",
			function () {
				const term = vscode.window.createTerminal("Podium");
				console.log(term);
				autoTerminalConfig
					.then((value) => {
						//console.log(value);
						term.show();
						term.sendText(`cd ..`);
						return term;
					})
					.then((term) => {
						vscode.commands.executeCommand("workbench.action.terminal.split");
					});
			}
		)
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
