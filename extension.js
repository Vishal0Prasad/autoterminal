// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode"); // This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let disposable = [];
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	let termConfig = null;
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
		termConfig = await readAutoTerminalConfig();
	}
	const parsedConfig = JSON.parse(termConfig).commandConfig;
	disposable = parsedConfig.map((exeConfig) => {
		switch (exeConfig.command) {
			case "auto-terminal.splitTerminal":
				return vscode.commands.registerCommand(
					"auto-terminal.splitTerminal",
					function () {
						console.log("Split Terminal");
						vscode.commands.executeCommand("workbench.action.terminal.split");
					}
				);
			case "auto-terminal.createTerminal":
				return vscode.commands.registerCommand(
					"auto-terminal.createTerminal",
					function () {
						const term = vscode.window.createTerminal("Podium");
						console.log("New Terminal", term);
						term.show();
						term.sendText(`${exeConfig.sendText}`);
					}
				);
			default:
				return null;
		}
	});

	console.log("DISPOSABLE", disposable);

	disposable.forEach((executable) => {
		context.subscriptions.push(executable);
	});

	parsedConfig.forEach((config) => {
		vscode.commands.executeCommand(`${config.command}`);
	});
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
