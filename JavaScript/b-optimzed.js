'use strict';

const wrap = (func) => {
  let limit = 0;
  let counter = 0;
  let timer = null;
  let fn = func;

  const wrapper = (...args) => {
    if (!fn) return;
    if (limit && counter === limit) {
      limit = 0;
      counter = 0;
      this.cancel();
      return;
    }
    const res = fn(...args);
    counter++;
    return res;
  };

  const methods = {
    cancel() {
      fn = null;
      return this;
    },
    resume() {
      if (!fn) {
        fn = func;
        if (limit) {
          limit = 0;
          counter = 0;
        }
      }
      return this;
    },
    timeout(msec) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => this.cancel(), msec);
      return this;
    },
    limit(count) {
      limit = count;
      counter = 0;
      return this;
    }
  };

  return Object.assign(wrapper, methods);
};

// Usage

const fn = (par) => {
  console.log('Function called, par: ' + par);
};

const f = wrap(fn).timeout(200).limit(3);
f('1st');

setTimeout(() => {
  f('2nd');
  f.cancel();
  f('3rd');
  f.resume();
  f('4th');
  f.timeout(200);
  setTimeout(() => {
    f('5th');
    setTimeout(() => {
      f('6th');
    }, 150);
  }, 150);
}, 150);
