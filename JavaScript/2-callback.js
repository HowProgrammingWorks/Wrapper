'use strict';

function cloneInterface(anInterface) {
  let fn, clone = {};
  for (let key in anInterface) {
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
      let callback = args[args.length - 1];
      if (typeof(callback) === 'function') {
        args[args.length - 1] = (...args) => {
          console.log('Callback: ' + fn.name);
          callback.apply(undefined, args);
        };
      } else callback = null;
    }
    console.log('Call: ' + fn.name);
    console.dir(args);
    fn.apply(undefined, args);
    console.log('Ended wrapper for: ' + fn.name);
  }
}

let interfaceName = {
  methodName: function(par1, par2, callback) {
    console.dir({ method: { par1, par2 } });
    callback(null, { field: 'value' });
  }
};

let cloned = cloneInterface(interfaceName);
cloned.methodName('Uno', 'Due', () => {
  console.log('Fire');
});
