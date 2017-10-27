'use strict';

// Wrapper will prevent calls > n

const wrapCount = (count, fn) => {
  let counter = 0;
  const wrapper = (...args) => {
    if (counter === count) return;
    counter++;
    fn(...args);
  };
  return wrapper;
};

const fn = (par) => {
  console.log('Function called, par: ' + par);
};

const fn2 = wrapCount(2, fn);

fn2('first');
fn2('second');
fn2('third');
