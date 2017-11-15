'use strict';

// Wrapper will prevent calls > n

const once = (fn) => {
  let finished = false;
  return (...args) => {
    if (finished) return;
    const res = fn(...args);
    finished = true;
    return res;
  };
};

// Usage

const fn = (par) => {
  console.log('Function called, par: ' + par);
};

const f = once(fn);

f('first');
f('second');
