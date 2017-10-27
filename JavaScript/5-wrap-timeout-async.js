'use strict';

// Wrapper will prevent call after timeout

function wrapTimeout(timeout, fn) {
  let timer = setTimeout(() => {
    if (timer) console.log('Function timedout');
    timer = null;
  }, timeout);
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

const fn100 = wrapTimeout(100, fn);
const fn200 = wrapTimeout(200, fn);

setTimeout(() => {
  fn100('first', (err, data) => {
    console.log('Callback, data: ' + data);
  });
  fn200('second', (err, data) => {
    console.log('Callback, data: ' + data);
  });
}, 150);
