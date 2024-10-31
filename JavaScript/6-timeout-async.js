'use strict';

// Wrapper will prevent call after timeout

const timeout = (f, msec) => {
  let timer = setTimeout(() => {
    if (timer) console.log('Function timedout');
    timer = null;
  }, msec);
  return (...args) => {
    if (!timer) return null;
    clearTimeout(timer);
    timer = null;
    return f(...args);
  };
};

// Usage

const fn = (par, callback) => {
  console.log('Function called, par:', par);
  callback(null, par);
};

const fn100 = timeout(fn, 100);
const fn200 = timeout(fn, 200);

setTimeout(() => {
  fn100('first', (err, data) => {
    console.log('Callback', data);
  });
  fn200('second', (err, data) => {
    console.log('Callback', data);
  });
}, 150);
