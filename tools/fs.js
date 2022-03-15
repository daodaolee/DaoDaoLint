const fs = require('fs');
const path = require('path');

// 读
function readFile(dir) {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    fs.readFileSync(path.resolve(dir), 'utf-8', (err, data) => {
      if (err) {
        reject(console.log(err))
      } else {
        resolve(data)
      }
    })
  })
}

// 写
function writeFile(dir, text) {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    fs.writeFileSync(path.resolve(dir), text, (err, data) => {
      if (err) {
        reject(console.log(err))
      } else {
        resolve(data)
      }
    })
  })
}

// 追加
function appendFile(dir, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(dir), text, { 'flag': 'a' }, (err) => {
      if (err) {
        reject(err)
      }
      resolve(console.log('追加内容成功'))
    })
  })
}

// 追加
function deleteFile(dir) {
  return new Promise((resolve, reject) => {
    fs.unlink(path.resolve(dir), (err) => {
      if (err) {
        reject(console.log(err))
      }
      resolve(console.log('删除文件成功'))
    })
  })
}

module.exports = {
  readFile,
  writeFile,
  appendFile,
  deleteFile
}