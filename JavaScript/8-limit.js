'use strict';

// Wrapper will prevent calls > n

const limit = (count, f) => {
  let counter = 0;
  return (...args) => {
    if (counter === count) return;
    counter++;
    return f(...args);
  };
};

// Usage

const fn = (par) => {
  console.log('Function called, par:', par);
};

const fn2 = limit(2, fn);

fn2('first');
fn2('second');
fn2('third');
