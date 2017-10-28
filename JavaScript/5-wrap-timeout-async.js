'use strict';

// Wrapper will prevent call after timeout

function timeout(msec, fn) {
  let timer = setTimeout(() => {
    if (timer) console.log('Function timedout');
    timer = null;
  }, msec);
  return (...args) => {
    if (timer) {
      timer = null;
      fn(...args);
    }
  };
}

const fn = (par, callback) => {
  console.log('Function called, par: ' + par);
  callback(null, par);
};

const fn100 = timeout(100, fn);
const fn200 = timeout(200, fn);

setTimeout(() => {
  fn100('first', (err, data) => {
    console.log('Callback, data: ' + data);
  });
  fn200('second', (err, data) => {
    console.log('Callback, data: ' + data);
  });
}, 150);
