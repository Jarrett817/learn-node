const cp = require('child_process');

let worker;

function spawn(server, config) {
  worker = cp.spawn('node', [server, cofig]);
  worker.on('exit', code => {
    if (code !== 0) {
      spawn(server, config);
    }
  });
}

function main(argv) {
  spawn('server.js', argv[0]);
  process.on('SIGTERM', () => {
    worker.kill();
    process.exit(0);
  });
}
// 守护进程，进一步启动和监控服务器进程

main(process.argv.slice(2));
