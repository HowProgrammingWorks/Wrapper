'use strict';

// Return struct

const cancelable1 = (fn) => {
  const wrapper = (...args) => (fn ? fn(...args) : null);
  const cancel = () => {
    fn = null;
  };
  return { call: wrapper, cancel };
};

// Mixin

const cancelable2 = (fn) => {
  const wrapper = (...args) => (fn ? fn(...args) : null);
  wrapper.cancel = () => {
    fn = null;
  };
  return wrapper;
};

// Usage

const fn = (par) => {
  console.log('Function called, par:', par);
};

{
  // Return struct
  const f2 = cancelable1(fn);
  f2.call('first');
  f2.cancel();
  f2.call('second');
}

{
  // Mixin
  const f2 = cancelable2(fn);
  f2('first');
  f2.cancel();
  f2('second');
}
