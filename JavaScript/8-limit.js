'use strict';

// Wrapper will prevent calls > n

const emptiness = () => {};

const limit = (count, fn) => {
  let counter = 0;
  if (!fn) return emptiness;
  const wrapped = (...args) => {
    if (counter === count) return null;
    counter++;
    return fn(...args);
  };
  return wrapped;
};

// Usage

const fn = (par) => {
  console.log('Function called, par:', par);
};

const fn2 = limit(2, fn);

fn2('first');
fn2('second');
fn2('third');
