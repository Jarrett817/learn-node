// 遍历一般递归，代码简洁
// 但是由于递归每次都会调用函数，有额外的函数调用成本，在需要优先考虑成本时，考虑换成循环算法

// 一般目录遍历都是深度优先+先序遍历
// 即优先遍历子节点，首次到达某节点就完成遍历

const fs = require('fs');
const path = require('path');
function travel(dir, callBack) {
  fs.readdirSync(dir).forEach(file => {
    const pathName = path.join(dir, file);
    if (fs.statSync(pathName).isDirectory()) {
      travel(pathName, callBack);
    } else {
      callBack(pathName);
    }
  });
}

travel('../test04', pathname => console.log(pathname));

// 文本编码常用UTF9和GBK

// UTF8可能带有BOM，在读取不同编码的文本文件时，需要将文件内容转换为JS使用的UTF8编码字符串后才能正常处理

// BOM用于标记一个文本文件使用Unicode编码，本身是一个Unicode字符，位于文本文件头部

function readText(pathname) {
  let bin = fs.readFileSync(pathname);
  console.log(bin);
  if (bin[0] === 0xef && bin[1] === 0xbb && bin[2] === 0xbf) {
    console.log('执行了');

    bin = bin.slice(3);
  }
  console.log('utf-8', bin.toString('utf-8'));
  return bin.toString('utf-8');
}

readText('./gbk.txt');

// node不支持GBK，可以借助iconv-lite包来转换编码
const iconv = require('iconv-lite');

function readGBKText(pathname) {
  const bin = fs.readFileSync(pathname);
  return iconv.decode(bin, 'gbk');
}

console.log(readGBKText('./gbk.txt'));

// 我们无法预知需要读取的文件的编码，用单字节编码来读取文件会更方便，即二进制

// 对于大于0xEF的单个字节在单子节编码下被解析成什么乱码，使用同样的单字节编码来保存时，背后对应的字节保持不变

function replace(pathname) {
  let str = fs.readFileSync(pathname, 'binary');
  str = str.replace('foo', 'bar');
  fs.writeFileSync(pathname, str, 'binary');
}
