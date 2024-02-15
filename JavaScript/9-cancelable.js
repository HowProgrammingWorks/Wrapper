'use strict';

const cancelable = (fn) => {
  const wrapper = (...args) => (fn ? fn(...args) : null);
  wrapper.cancel = () => fn = null;
  return wrapper;
};

// Usage

const fn = (par) => {
  console.log('Function called, par:', par);
};

const f2 = cancelable(fn);

f2('first');
f2.cancel();
f2('second');
