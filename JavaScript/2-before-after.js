'use strict';

const wrap =
  (f, before, after) =>
  (...args) =>
    after(f(...before(...args)));

// Usage

const func = (par1, par2) => {
  console.dir({ par1, par2 });
  return [par1, par2];
};

const before = (...args) => {
  console.log('before');
  return args;
};

const after = (res) => {
  console.log('after');
  return res;
};

const wrapped = wrap(func, before, after);
const res = wrapped('Uno', 'Due');
console.dir({
  res,
  func: func.length,
  wrapped: wrapped.length,
});
