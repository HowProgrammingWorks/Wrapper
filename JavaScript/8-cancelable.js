'use strict';

const cancelable = (fn) => {
  const wrap = (...args) => {
    if (fn) return fn(...args);
  };
  wrap.cancel = () => {
    fn = null;
  };
  return wrap;
};

const fn = (par) => {
  console.log('Function called, par: ' + par);
};

const f = cancelable(fn);
f('first');

f.cancel();
f('second');
