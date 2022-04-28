const head = require('./head');
const body = require('./body.js');

exports.create = function (name) {
  console.log('需要身体和脑袋');
  return {
    name: name,
    head: head.create(),
    body: body.create(),
  };
};
