'use strict';

const wrap = (fn) => {
  let limit = 0;
  let counter = 0;

  const wrap = (...args) => {
    if (limit && counter++ === limit) wrap.cancel();
    if (fn) return fn(...args);
  };

  wrap.cancel = () => {
    fn = null;
    return wrap;
  };

  wrap.timeout = (msec) => {
    setTimeout(() => {
      wrap.cancel();
    }, msec);
    return wrap;
  };

  wrap.limit = (count) => {
    limit = count;
    return wrap;
  };

  return wrap;
};

// Usage:

const fn = (par) => {
  console.log('Function called, par: ' + par);
};

const f = wrap(fn).timeout(200).limit(3);
f('1st');

setTimeout(() => {
  f('2nd');
  f('3rd');
  f.cancel();
  f('4th');
}, 150);

