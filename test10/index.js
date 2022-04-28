// url模块解析、生成、拼接URL

const url = require('url');
// console.log(url.parse('http://baidu.com?name=zhangsan', true));

url.format({}); // 可以将对象转为URL字符串

// console.log(url.resolve('http://baidu.com', 'baz'));

const querystring = require('querystring');

// 实现URL参数字符串转成对象
console.log(querystring.parse('name=zhangsan'));
