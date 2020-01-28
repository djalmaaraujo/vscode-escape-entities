const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;

const chars = [
	{
		char: `'`,
		value: '&apos;',
	},
	{
		char: `>`,
		value: '&gt;',
	},
	{
		char: `"`,
		value: '&quot;',
	},
	{
		char: `{`,
		value: '&#123;',
	},
	{
		char: `}`,
		value: '&#125;',
	}
]

const findChar = (char) => chars.find((i) => char.toString() === i.char)

async function escapeEntities () {
	const selection = editor.selection;
	const text = editor.document.getText(selection);
	const char = findChar(text);

	if (char) {
		editor.edit(builder => {
			builder.replace(selection, char.value)
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