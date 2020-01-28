const vscode = require('vscode');

const editor = vscode.window.activeTextEditor;

async function escapeEntities () {
	const selection = editor.selection;
	const text = editor.document.getText(selection);
	const char = `&#${text.charCodeAt()};`;

	if (char) {
		editor.edit(builder => {
			builder.replace(selection, char)
		})
	}
}

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.escapeEntities', function () {
        escapeEntities();
    });

    context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;