'use strict';

function cloneInterface(anInterface) {
  let key, fn, clone = {};
  for (key in anInterface) {
    fn = anInterface[key];
    clone[key] = wrapFunction(fn);
  }
  return clone;
}

function wrapFunction(fn) {
  console.log('Wrap function: ' + fn.name);
  return (...args) => {
    console.log('Called wrapper for: ' + fn.name);
    console.dir({ args });
    fn(...args);
    console.log('Ended wrapper for: ' + fn.name);
  };
}

let interfaceName = {
  methodName: function(par1, par2) {
    console.dir({ method: { par1, par2 } });
  }
};

let cloned = cloneInterface(interfaceName);
cloned.methodName('Uno', 'Due');
