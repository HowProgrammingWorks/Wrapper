'use strict';

const wrap = func => {
  let limit = 0;
  let counter = 0;
  let timer = null;
  let fn = func;

  const wrapper = (...args) => {
    //console.dir({ limit, counter, fn, args });
    if (!fn) return;
    if (limit && counter === limit) {
      limit = 0;
      counter = 0;
      wrapper.cancel();
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
      if (!fn) fn = func;
      return this;
    },
    timeout(msec) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => this.cancel(), msec);
      return this;
    },
    limit(count) {
      limit = count || 0;
      counter = 0;
      return this;
    }
  };

  return Object.assign(wrapper, methods);
};

// Usage

const fn = par => {
  console.log('Function called, par:', par);
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
      f.limit(1);
      f('6th');
      f('7th');
      f.resume();
      f('8th');
    }, 150);
  }, 150);
}, 150);
