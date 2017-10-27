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

const fn = (par) => {
  console.log('Function called, par: ' + par);
};

const fn100 = wrapTimeout(100, fn);
const fn200 = wrapTimeout(200, fn);

setTimeout(() => {
  fn100('first');
  fn200('second');
}, 150);
