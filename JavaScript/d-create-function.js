'use strict';

const wrap = (before, after, fn) => {
  const args = [];
  for (let i = 1; i <= fn.length; i++) {
    args.push(`a${i}`);
  }
  const createFn = new Function(...args, `
    const fn = ${fn};
    const before = ${before};
    const after = ${after};
    return after(fn(...before(${args.join(', ')})));
  `);
  return createFn;
};

// Usage

const func = (par1, par2) => {
  console.dir({ par1, par2 });
  return [par1, par2];
};

const before = (...args) => {
  console.log('before');
  return args;
};

const after = res => {
  console.log('after');
  return res;
};

const wrapped = wrap(before, after, func);
const res = wrapped('Uno', 'Due');
console.dir({
  res,
  func: func.length,
  wrapped: wrapped.length,
});
