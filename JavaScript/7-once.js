'use strict';

// Wrapper will prevent calls > n

const emptiness = () => {};

const once = (fn) => {
  if (!fn) return emptiness;
  let finished = false;
  const wrapped = (...args) => {
    if (finished) return;
    finished = true;
    fn(...args);
  };
  return wrapped;
};

// Usage

const fn = (par) => {
  console.log('Function called, par:', par);
};

const fn2 = once(fn);

fn2('first');
fn2('second');
