function hello() {
  console.log('hello word');
}

// hello();

const foo1 = require('./foo');
const foo2 = require('./foo.js');
const foo3 = require('/Users/me/Desktop/WorkSpace/learn-node/test01/foo');
// console.log(foo1, foo2, foo3);

// node可以直接读json
const jsonData = require('./data.json');
// console.log(jsonData, jsonData.name, jsonData.age);

// 模块会初始化，第一次被使用时会执行一次，并在执行过程中初始化模块的导出对象
// 之后缓存起来的对象被重复利用
const exportsFn = require('./foo');
console.log(exportsFn);

// 一个文件只有一个exports对象，重复声明会被覆盖
const exportsVar = require('./foo');
// console.log(exportsVar);

const moduleExports = require('./foo');
// console.log(moduleExports);

// console.log(moduleExports, moduleExports());

// node 命令执行的模块称为主模块
