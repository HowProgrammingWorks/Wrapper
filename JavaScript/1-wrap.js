'use strict';

// const wrap = f => (...args) => f(...args);

const wrap = f => {
  console.log('Wrap function:', f.name);
  return (...args) => {
    console.log('Called wrapper for:', f.name);
    console.dir({ args });
    const result = f(...args);
    console.log('Ended wrapper for:', f.name);
    console.dir({ result });
    return result;
  };
};

// Usage

const func = (par1, par2) => {
  console.dir({ method: { par1, par2 } });
  return [par1, par2];
};

const wrapped = wrap(func);
wrapped('Uno', 'Due');
