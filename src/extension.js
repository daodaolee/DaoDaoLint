// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs')
const babel = require("@babel/core");
const path = require("path");
const { readFile, writeFile } = require("../tools/fs")

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('恭喜！您的扩展 DaoDaoLint 已被激活');

  let visitor = {
    Identifier(path) {
      path.node.name = path.node.name
        .split("")
        .reverse()
        .join("");
    },
    CallExpression(data) {
      data.node.arguments[0].value = data.node.arguments[0].value
        .split("")
        .reverse()
        .join("");
    }
  }

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('daodaolint.helloWorld', async data => {
    const code = await readFile(data.fsPath)
    const obj = babel.transform(code, {
      babelrc: true,
      plugins: [{
        visitor
      }]
    });
    await writeFile(data.fsPath, obj.code)
    vscode.window.showInformationMessage('Hello World from DaoDaoLint!');
  });


  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {
  console.log("您的扩展 DaoDaoLint 已被释放")
}

module.exports = {
  activate,
  deactivate
}
