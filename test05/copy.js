const fs = require('fs');

function copy(src, dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
  copy(argv[0], argv[1]);
}

main(process.argv.slice(2));

// node copy.js ./test2.json ./test1.json
