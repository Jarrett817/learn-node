const child_process = require('child_process');

const child2 = child_process.spawn('node', ['child.js'], {
  stdio: [0, 1, 2, 'ipc'],
});

// 给子进程发送消息
child2.send({ hello: 'hello' });

child2.on('message', msg => {
  console.log(msg);
});
