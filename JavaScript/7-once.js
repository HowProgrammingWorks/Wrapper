'use strict';

// Wrapper will prevent calls > n

const once = (f) => (...args) => {
  if (!f) return;
  const res = f(...args);
  f = null;
  return res;
};

// Usage

const fn = (par) => {
  console.log('Function called, par:', par);
};

const fn2 = once(fn);

fn2('first');
fn2('second');
