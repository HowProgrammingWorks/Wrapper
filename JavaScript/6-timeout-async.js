'use strict';

// Wrapper will prevent call after timeout

const timeout = (f, msec) => {
  let timer = setTimeout(() => {
    if (timer) console.log('Function timed out');
    timer = null;
  }, msec);
  return (...args) => {
    let result = undefined;
    if (!timer) return result;
    clearTimeout(timer);
    timer = null;
    result = f(...args);
    return result;
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
  fn100('first', (error, data) => {
    console.log({ callback: { error, data } });
  });
  fn200('second', (error, data) => {
    console.log({ callback: { error, data } });
  });
}, 150);
