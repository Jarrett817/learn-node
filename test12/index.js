const child_process = require('child_process');
const util = require('util');

function copy(source, target, callback) {
  // 调用终端命令来简化目录拷贝
  child_process.exec(util.format('cp -r %s/* %s', source, target), callBack);
}

// process全局对象通过process.argv获取命令行执行参数
// process.argv.slice(2);

// process.exit(1); // 退出命令行

// console.log的实现

function myLog() {
  process.stdout.write(util.format.apply(util, arguments) + '\n');
}
myLog('123123');

// 降权限，理解下来是指运行该代码时用了sudo，运行程序的用户的UID和GID存在env环境变量的SUDO里皮面，如果是chmod+s获得root权限的，直接process.get获取
http.createServer(callback).listen(80, function () {
  var env = process.env,
    uid = parseInt(env['SUDO_UID'] || process.getuid(), 10),
    gid = parseInt(env['SUDO_GID'] || process.getgid(), 10);

  process.setgid(gid);
  process.setuid(uid);
});

// 创建子进程，就是通过node命令行新启动一个node程序
const child = child_process.spawn('node', ['xxx.js']);

child.stdout.on('data', data => {
  console.log(data);
});

child.stderr.on('data', data => {
  console.log('stderr' + data);
});

child.on('close', function (code) {});

// 进程间通讯

// 父进程中
const child1 = child_process.spawn('node', ['命令行参数1']);

child.kill('SIGTERM'); // 通过信号通讯

// 子进程中
process.on('SIGTERM', () => {
  cleanUp();
  process.exit(0);
});

// process相当于传输事件的总线

// 当父子都是nodejs进程，可以通过IPC双向传递数据

// 父进程

const child2 = child_process.spawn('node', ['child.js'], {
  stdio: [0, 1, 2, 'ipc'],
});

child2.on('message', msg => {
  console.log(msg);
});

child2.send({ hello: 'hello' });

// 子进程
process.on('message', msg => {
  msg.hello = msg.hello.toUpperCase();
  process.send(msg);
});
