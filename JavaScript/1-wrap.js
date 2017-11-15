'use strict';

const wrap = (fn) => {
  console.log('Wrap function: ' + fn.name);
  return (...args) => {
    console.log('Called wrapper for: ' + fn.name);
    console.dir({ args });
    const result = fn(...args);
    console.log('Ended wrapper for: ' + fn.name);
    console.dir({ result });
    return result;
  };
};

// Usage

const func = (par1, par2) => {
  console.dir({ method: { par1, par2 } });
  return [par1, par2];
};

const cloned = wrap(func);
cloned('Uno', 'Due');
