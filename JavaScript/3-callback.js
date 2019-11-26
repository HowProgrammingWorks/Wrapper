'use strict';

// const wrap = (before, after, f) => (...args) => after(f(...before(...args)));

// const wrapAsync = (before, after, beforeCb, afterCb, f) =>
//   (...args) => {
//     const callback = arrs[arrs.length -1];
//     if (typeof callback === 'function') {
//       args[args.length - 1] = (...pars) =>
//         afterCb(callback(...beforeCb(...pars)));
//     }
//     return after(f(...before(...args)));
//   };

const wrapFunction = f => {
  console.log('Wrap function:', f.name);
  return (...args) => {
    console.log('Called wrapper for:', f.name);
    console.dir({ args });
    if (args.length > 0) {
      const callback = args[args.length - 1];
      if (typeof callback === 'function') {
        args[args.length - 1] = (...args) => {
          console.log('Callback:', f.name);
          return callback(...args);
        };
      }
    }
    console.log('Call:', f.name);
    console.dir(args);
    const result = f(...args);
    console.log('Ended wrapper for:', f.name);
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
