const { fstat } = require('fs');
const http = require('http');

// http
//   .createServer(function (request, response) {
//     response.writeHead(200, { 'Content-Type': 'text-plain' });
//     response.end('Hello World\n');
//   })
//   .listen(8124);

// linux,1024以下的端口需要root权限，需要sudo

// http模块作为服务端使用时，创建一个服务器，监听客户端请求并返回响应
// 作为客户端使用时，发起http客户端请求，获取服务端响应

/*
POST / HTTP/1.1
User-Agent: curl/7.26.0
Host: localhost
Accept: *\/*
Content-Length: 11
Content-Type: application/x-www-form-urlencoded

Hello World
*/

// http请求发送给服务器，可以认为是按照从头到尾的顺序以一个字节一个字节地以数据流的方式发送，http模块创建的服务器会在接收到完整请求头后，调用回调
http
  .createServer((request, response) => {
    const body = [];
    // 可以把request对象作为一个只读数据流，同理也可以把response当成一个只写数据流
    request.on('data', chunk => {
      body.push(chunk);
    });

    request.on('end', () => {
      body = Buffer.concat(body);
      console.log(body.toString());
    });

    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello World\n');
  })
  .listen(8124);

// 作为客户端使用时，发起一个http请求

const request = http.request(options, response => {});

request.write('Hello World');
request.end();

// https和http模块的使用基本类似，区别在于证书

const options = {
  key: fs.readFileSync('./ssl/default.key'),
  cert: fs.readFileSync('./ssl/default.cer'),
};

const server = https.createServer(options, (request, response) => {});

// node 支持SNI技术，可以根据HTTPS客户端请求使用的域名动态使用不同的证书，因此同一个HTTPS服务器可以使用多个　域名提供服务

// 动态设置不同域名对应的证书
server.addContext('foo.com', {
  key: fs.readFileSync('./ssl/foo.com.key'),
  cert: fs.readFileSync('./ssl/foo.com.cer'),
});

server.addContext('bar.com', {
  key: fs.readFileSync('./ssl/bar.com.key'),
  cert: fs.readFileSync('./ssl/bar.com.cer'),
});

// 自制证书要使用的话，需要在options里加入rejectUnauthorized:false
