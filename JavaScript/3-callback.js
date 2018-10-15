'use strict';

// const wrap = (before, after, fn) =>
//  (...args) => after(fn(...before(...args)));

// const wrapAsync = (before, after, beforeCb, afterCb, fn) =>
//   (...args) => {
//     const callback = arr[arr.length -1];
//     if (typeof callback === 'function') {
//       args[args.length - 1] = (...pars) =>
//         afterCb(callback(...beforeCb(...pars)));
//     }
//     return after(fn(...before(...args)));
//   };

const wrapFunction = fn => {
  console.log('Wrap function:', fn.name);
  return (...args) => {
    console.log('Called wrapper for:', fn.name);
    console.dir({ args });
    if (args.length > 0) {
      const callback = args[args.length - 1];
      if (typeof callback === 'function') {
        args[args.length - 1] = (...args) => {
          console.log('Callback:', fn.name);
          return callback(...args);
        };
      }
    }
    console.log('Call:', fn.name);
    console.dir(args);
    const result = fn(...args);
    console.log('Ended wrapper for:', fn.name);
    console.dir({ result });
    return result;
  };
};

const cloneInterface = anInterface => {
  const clone = {};
  for (const key in anInterface) {
    const fn = anInterface[key];
    clone[key] = wrapFunction(fn);
  }
  return clone;
};

// Usage

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
