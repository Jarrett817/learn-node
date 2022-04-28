const fs = require('fs');

fs.stat();
fs.chmod();
fs.chown();

// 文件内容读写
fs.readFile();
fs.readdir();
fs.writeFile();
// 回调版本，都有各自的同步版本，加上Sync

const path = require('path');
path.normalize(); // 解析路径中的.. ./ 去掉斜杠

path.join(); // 拼接路径

path.extname(); // 获取拓展名
