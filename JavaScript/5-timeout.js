'use strict';

// Wrapper will prevent call after timeout

const timeout = (msec, f) => {
  let timer = setTimeout(() => {
    if (timer) console.log('Function timed out');
    timer = null;
  }, msec);
  return (...args) => {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
    return f(...args);
  };
};

// Usage

const fn = (par) => {
  console.log('Function called, par:', par);
};

const fn100 = timeout(100, fn);
const fn200 = timeout(200, fn);

setTimeout(() => {
  fn100('first');
  fn200('second');
}, 150);
