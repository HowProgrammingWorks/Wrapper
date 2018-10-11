'use strict';

// Wrapper will prevent calls > n

const once = fn => (...args) => {
  if (!fn) return;
  const res = fn(...args);
  fn = null;
  return res;
};

// Usage

const fn = par => {
  console.log('Function called, par:', par);
};

const f = once(fn);

f('first');
f('second');
