'use strict';

// Wrapper will prevent call after timeout

const timeout = (msec, fn) => {
  let timer = setTimeout(() => {
    if (timer) console.log('Function timedout');
    timer = null;
  }, msec);
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      return fn(...args);
    }
  };
};

// Usage

const fn = (par, callback) => {
  console.log('Function called, par: ' + par);
  callback(null, par);
};

const fn100 = timeout(100, fn);
const fn200 = timeout(200, fn);

setTimeout(() => {
  fn100('first', (err, data) => {
    console.log('Callback first', data);
  });
  fn200('second', (err, data) => {
    console.log('Callback second', data);
  });
}, 150);
