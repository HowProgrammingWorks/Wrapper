'use strict';

const cancelable = (f) => {
  const wrapper = (...args) => {
    if (f) return f(...args);
  };
  wrapper.cancel = () => f = null;
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
