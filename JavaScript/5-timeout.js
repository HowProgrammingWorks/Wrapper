'use strict';

// Wrapper will prevent call after timeout

const timeout = (msec, fn) => {
  let timer = setTimeout(() => {
    if (timer) console.log('Function timedout');
    timer = null;
  }, msec);
  let callCounter = 0;
  return (...args) => {
    if (timer && callCounter < 4) {
      callCounter++;
      return fn(...args);
    }
    else if (timer) {
      clearTimeout(timer);
      timer = null;
      return fn(...args);
    }
  };
};

// Usage

const fn = par => {
  console.log('Function called, par:', par);
};

const fn100 = timeout(100, fn);
const fn200 = timeout(200, fn);

setTimeout(() => {
  fn100('first');
  fn200('1');
  fn200('2');
  fn200('3');
  fn200('4');
  fn200('5');
  fn200('6');
}, 150);
