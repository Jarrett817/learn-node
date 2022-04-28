process.on('message', msg => {
  // 接收父进程的消息并通过process发送消息

  // 一般在传递中，会通过JSON.stringify和parse处理
  msg.hello = msg.hello.toUpperCase();
  process.send(msg);
});
