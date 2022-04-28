// 模块路径解析规则
// 内置模块不做解析
const fs = require('fs');

// node_modules目录
const x = require('foo/bar');
// node会依次查找以下路径
/* 
 /Users/me/Desktop/WorkSpace/learn-node/node_modules/test03/foo/bar
 /Users/me/node_modules/foo/bar
 /node_modules/foo/bar
*/

// console.log(x);

// NODE_PATH环境变量
// console.log(NODE_PATH);
// 指定了NODE_PATH，nodejs会额外尝试指定路径
// NODE_PATH=/home/user/lib:/home/lib

// /home/user/lib/foo/bar
// /home/lib/foo/bar
