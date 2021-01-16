'use strict';

const wrapFunction = (f) => {
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

const cloneInterface = (anInterface) => {
  const clone = {};
  for (const key in anInterface) {
    const fn = anInterface[key];
    clone[key] = wrapFunction(fn);
  }
  return clone;
};

// Usage

const interfaceName = {
  methodSync(par1, par2) {
    console.dir({ method: { par1, par2 } });
    return [par1, par2];
  },
  methodAsync(par1, par2, callback) {
    console.dir({ method: { par1, par2 } });
    callback(null, { field: 'value' });
  }
};

const cloned = cloneInterface(interfaceName);
cloned.methodSync('Uno', 'Due');

cloned.methodAsync('Tre', 'Quattro', (err, res) => {
  if (err) throw err;
  console.dir({ res });
});
