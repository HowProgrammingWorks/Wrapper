'use strict';

function cloneInterface(anInterface) {
  const clone = {};
  let key, fn;
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
    if (args.length > 0) {
      const callback = args[args.length - 1];
      if (typeof(callback) === 'function') {
        args[args.length - 1] = (...args) => {
          console.log('Callback: ' + fn.name);
          callback(...args);
        };
      } else {
        callback = null;
      }
    }
    console.log('Call: ' + fn.name);
    console.dir(args);
    fn(...args);
    console.log('Ended wrapper for: ' + fn.name);
  };
}

const interfaceName = {
  methodName(par1, par2, callback) {
    console.dir({ method: { par1, par2 } });
    callback(null, { field: 'value' });
  }
};

const cloned = cloneInterface(interfaceName);
cloned.methodName('Uno', 'Due', () => {
  console.log('Fire');
});
