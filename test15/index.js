class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'resolved';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err;
          };
    //返回一个新的promise对象实现链式调用
    return new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value);
        resolve(x);
      }
      if (this.state === 'rejected') {
        let x = onRejected(this.reason);
        reject(x);
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value);
          resolve(x);
        });
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason);
          reject(x);
        });
      }
    });
  }
}

MyPromise.deferred = function () {
  const result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};
var promisesAplusTests = require('promises-aplus-tests');

promisesAplusTests(MyPromise, function (err) {
  // All done; output is in the console. Or check `err` for number of failures.
  console.log;
});

module.exports = MyPromise;
