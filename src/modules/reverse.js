// @ts-nocheck
const vscode = require('vscode')
const path = require('path')
const fs = require('fs')
const { readFile } = require('../../tools/fs')

const babel = require("@babel/core");
// const { readFile, writeFile } = require("../tools/fs")

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

// const read = () => {
//   // 获取当前编辑的文件对象，如果没有打开任何文件，则为空  
//   const activeEditor = vscode.window.activeTextEditor;
//   if (!activeEditor) {
//     return;
//   }
//   // 获取编辑文件的文件名
//   const activeFilePath = activeEditor.document.fileName;
//   // @ts-ignore
//   fs.readFile(path.resolve(activeFilePath), 'utf-8', (err, data) => {
//     console.log(data)
//   })
// }
const lint = (editor) => {
  // 默认合并
  // @ts-ignore
  editor.edit(async (editBuilder) => {
    try {
      // 找到当前活动窗口
      const activeEditor = vscode.window.activeTextEditor;
      if (!activeEditor) {
        return;
      }
      // 获取内容
      const code = activeEditor.document.getText()

      const result = babel.transform(code, {
        babelrc: true,
        plugins: [{
          visitor
        }]
      })
      // 开始到结束，全量替换
      const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
      editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), result.code)

      setTimeout(() => {
        try {
          editor.document.save()

        } catch (err) {
          console.log(err)
        }
      }, 200)
    } catch (err) {
      console.log(err)
    }
  })
}
module.exports = {
  lint
}
