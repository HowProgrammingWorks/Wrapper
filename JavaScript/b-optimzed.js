'use strict';

const wrap = (f) => {
  let limit = 0;
  let counter = 0;
  let timer = null;
  let fn = f;

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
      if (!fn) fn = f;
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

const fn = (par) => {
  console.log('Function called, par:', par);
};

const fn2 = wrap(fn).timeout(200).limit(3);
fn2('1st');

setTimeout(() => {
  fn2('2nd');
  fn2.cancel();
  fn2('3rd');
  fn2.resume();
  fn2('4th');
  fn2.timeout(200);
  setTimeout(() => {
    fn2('5th');
    setTimeout(() => {
      fn2.limit(1);
      fn2('6th');
      fn2('7th');
      fn2.resume();
      fn2('8th');
    }, 150);
  }, 150);
}, 150);
