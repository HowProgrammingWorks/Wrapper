'use strict';

const wrap = (before, after, fn) => (...args) => after(fn(...before(...args)));

// Usage

const func = (par1, par2) => {
  console.dir({ method: { par1, par2 } });
  return [par1, par2];
};

const before = (...args) => {
  console.log('before');
  return args;
};

const after = (...args) => {
  console.log('after');
  return args;
};

const wrapped = wrap(before, after, func);
wrapped('Uno', 'Due');

console.dir({
  func: func.length,
  wrapped: wrapped.length
});
