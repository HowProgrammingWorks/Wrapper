'use strict';

// Wrapper will prevent call after timeout

const timeoutCallback = (delayCallback, fn) => {
  // define flag
  let killFlag = false;

  const timeout = setTimeout(() => {
    killFlag = true;
  }, delayCallback);

  return (...args) => {
    const callback = args[args.length - 1];
    if (typeof callback === 'function') {
      args[args.length - 1].flag = killFlag;
      timeout.close();
    }
    fn(...args);
  };
};

// Usage

const fn = (par, callback) => {
  console.log('Function called, par:', par);
  if(!callback.flag) callback(null, par);
};

const fn100 = timeoutCallback(100, fn);
const fn200 = timeoutCallback(200, fn);

setTimeout(() => {
  fn100('first', (err, data) => {
    console.log('Callback', data);
  });
  fn200('second', (err, data) => {
    console.log('Callback', data);
  });
}, 150);

// console:
// Function called, par: first
// Function called, par: second
// Callback second
