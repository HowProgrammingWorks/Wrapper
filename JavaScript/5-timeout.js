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

const fn = (par) => {
  console.log('Function called, par:', par);
};

const fn100 = timeout(fn, 100);
const fn200 = timeout(fn, 200);

setTimeout(() => {
  fn100('first');
  fn200('second');
}, 150);
