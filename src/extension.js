// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const reverse = require('./modules/reverse')


function registerCommand(context) {
  const init = vscode.commands.registerCommand('daodaolint.lint', () => {
    // @ts-ignore
    const editor = vscode.editor || vscode.window.activeTextEditor // 每次运行选中文件
    // @ts-ignore
    reverse.lint(editor)
  });
  context.subscriptions.push(init);
}
function activate(context) {
  // 当插件关闭时被清理的可清理列表
  try {
    registerCommand(context) // 注册命令
  } catch (err) {
    console.log(err)
  }
}
// this method is called when your extension is deactivated
function deactivate() {
  console.log("您的扩展 DaoDaoLint 已被释放")
}

module.exports = {
  activate,
  deactivate
}
