// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode"); // This method is called when your extension is activated
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
			//console.log(document, text);
		});
	}

	disposable.push(
		vscode.commands.registerCommand(
			"auto-terminal.newTerminal",
			async function () {
				// async function createNewTerminal() {
				// 	const newTerminal =
				// 	//await newTerminal.show(true);
				// 	return newTerminal;
				// }
				//vscode.window.terminals
				// const newTerminal = new Promise(async (resolve, reject) => {
				// 	const newTerminal = vscode.window.createTerminal("Podium");
				// 	console.log(newTerminal);
				// 	newTerminal.show();
				// 	return newTerminal;
				// });
				// console.log(newTerminal);

				function showTerminal(terminal) {
					terminal.show(true);
					//return undefined;
				}

				const newTerminal = vscode.window.createTerminal("Podium");
				// await new Promise((resolve, reject) => {
				// 	showTerminal(newTerminal);
				// });
				setTimeout(() => {
					showTerminal(newTerminal);
				}, 0);
				// .then((value) => {
				// 	console.log(value);
				// });

				//await terminal.show(true);
				// newTerminal.then((terminal) => {
				// 	return;
				// });
				//.then((terminal) => {
				//console.log(newTerminal);
				//await newTerminal.resolve()
				// await newTerminal.then((terminal) => {
				// 	terminal.show(true);
				// });
				//await newTerminal.show(true);
				//});
				//await newTerminal.show(true)
				//setTimeout(() => {
				vscode.commands.executeCommand("workbench.action.terminal.split");
				//}, 1000);
				//console.log(newTerminal.creationOptions.location);
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
