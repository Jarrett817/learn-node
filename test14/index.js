// 守护子进程，监控工作进程的运行状态，工作不正常退出时重启

const { ChildProcess } = require('child_process');

function spawn(mainModule) {
  const worker = ChildProcess.spawn('node', [mainModule]);

  worker.on('exit', code => {
    if (code !== 0) {
      spawn(mainModule);
    }
  });
}
