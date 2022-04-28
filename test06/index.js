const bin = new Buffer([0x68, 0x65, 0x6c]);

console.log(bin[0]);

console.log(bin.toString());

const bin1 = new Buffer('hello', 'utf-8');

console.log(bin1);

// 字符串是只读的，对字符串的任何修改得到的都是一个新字符串
// buffer可以直接修改某个位置的字节

// .slice不会返回一个新的buffer，而是返回了指定buffer中间某个位置的指针

// 因此slice方法返回的buffer受到修改时会影响原buffer，它们是有引用关系的

// 拷贝buffer
const dup = new Buffer(bin.length);
bin.copy(dup);

// buffer将js的数据处理能力从字符串扩展到了任意二进制的数据
const rs = fs.createReadStream();

rs.on('data', chunk => {
  rs.pause();

  // doSomething
  rs.resume();
});

rs.on('end', () => {
  cleanUp();
});

// .pipe方法实现数据从只读数据流到只写数据流的搬运，包括了防爆仓控制

rs.on('data', chunk => {
  if (ws.write(chunk) === false) {
    rs.pause();
  }
});

rs.on('end', () => {
  ws.end();
});

// drain 事件判断什么时候只写数据流已经将缓存中的数据写入目标
// 可以传入下一个待写数据
ws.on('drain', () => {
  rs.resume();
});
