'use strict';

const wrap = (fn) => {
  let limit = 0;
  let counter = 0;

  const wrapper = (...args) => {
    if (limit && counter === limit) wrapper.cancel();
    if (fn) {
      const res = fn(...args);
      counter++;
      return res;
    }
  };

  wrapper.cancel = () => {
    fn = null;
    return wrapper;
  };

  wrapper.timeout = (msec) => {
    setTimeout(() => {
      wrapper.cancel();
    }, msec);
    return wrapper;
  };

  wrapper.limit = (count) => {
    limit = count;
    return wrapper;
  };

  return wrapper;
};

// Usage

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
