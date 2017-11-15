'use strict';

const cancelable = (fn) => {
  const wrapper = (...args) => {
    if (fn) return fn(...args);
  };
  wrapper.cancel = () => {
    fn = null;
    return wrapper;
  };
  return wrapper;
};

// Usage

const fn = (par) => {
  console.log('Function called, par: ' + par);
};

const f = cancelable(fn);
f('first');

f.cancel();
f('second');
