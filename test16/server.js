const fs = require('fs'),
  path = require('path'),
  http = require('http');

const MIME = {
  '.css': 'text/css',
  '.js': 'application/javascript',
};

function combineFiles(pathnames, callback) {
  const output = [];
  function next(i, len) {
    if (i < len) {
      fs.readFile(pathnames[i], function (err, data) {
        console.log(typeof data);
        if (err) {
          callback(err);
        } else {
          output.push(data);
          next(i + 1, len);
        }
      });
    } else {
      callback(null, Buffer.concat(output));
    }
  }

  next(0, pathnames.length);
}

function main(argv) {
  const config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
    root = config.root || '.',
    port = config.port || 80;

  http
    .createServer(function (request, response) {
      const urlInfo = parseURL(root, request.url);

      combineFiles(urlInfo.pathnames, function (err, data) {
        if (err) {
          response.writeHead(404);
          response.end(err.message);
        } else {
          response.writeHead(200, {
            'Content-Type': urlInfo.mime,
          });
          response.end(data);
        }
      });
    })
    .listen(port);
}

// url解析函数
function parseURL(root, url) {
  let base, pathnames, parts;
  if (url.indexOf('??') === -1) {
    url = url.replace('/', '/??');
  }

  parts = url.split('??');
  base = parts[0];
  pathnames = parts[1].split(',').map(function (value) {
    return path.join(root, base, value);
  });

  return {
    mime: MIME[path.extname(pathnames[0])] || 'text/plain',
    pathnames,
  };
}

// combineFiles(['./files/test1.js', './files/test2.css'], (err, data) => {
//   console.log(data, '----');
// });

main(process.argv.slice(2));
