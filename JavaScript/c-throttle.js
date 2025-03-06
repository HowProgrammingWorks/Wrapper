'use strict';

// Function throttling, executed once per interval

const throttle = (delay, f, ...args) => {
  let timer;
  let pendingArgs = null;

  const throttled = () => {
    timer = undefined;
    if (pendingArgs) {
      wrapped(...pendingArgs);
      pendingArgs = null;
    }
  };

  const wrapped = (...params) => {
    if (!timer) {
      timer = setTimeout(throttled, delay);
      return f(...args, ...params);
    }
    pendingArgs = params;
    return null;
  };

  return wrapped;
};

// Usage

const fn = (...args) => {
  console.log('Function called, args:', args);
};

const ft = throttle(200, fn, 'throttled');

let calls = 0;
const timer = setInterval(() => {
  calls++;
  fn(calls);
  ft(calls);
}, 50);

setTimeout(() => {
  clearInterval(timer);
}, 2000);
