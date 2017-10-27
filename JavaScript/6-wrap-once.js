'use strict';

// Wrapper will prevent calls > n

const wrapOnce = (fn) => {
  let finished = false;
  const wrapper = (...args) => {
    if (finished) return;
    finished = true;
    fn(...args);
  };
  return wrapper;
};

const fn = (par) => {
  console.log('Function called, par: ' + par);
};

const f = wrapOnce(fn);

f('first');
f('second');
