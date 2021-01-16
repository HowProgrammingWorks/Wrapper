'use strict';

// const wrap = (before, after, f) => (...args) => after(f(...before(...args)));

// const wrapAsync = (before, after, beforeCb, afterCb, f) =>
//   (...args) => {
//     const callback = args[args.length - 1];
//     if (typeof callback === 'function') {
//       args[args.length - 1] = (...pars) =>
//         afterCb(callback(...beforeCb(...pars)));
//     }
//     return after(f(...before(...args)));
//   };

const wrapFunction = (f) => {
  console.log('Wrap function:', f.name);
  return (...args) => {
    console.log('Called wrapper for:', f.name);
    console.dir({ args });
    if (args.length > 0) {
      const callback = args[args.length - 1];
      if (typeof callback === 'function') {
        args[args.length - 1] = (...args) => {
          console.log('Callback:', f.name);
          const cbRes = callback(...args);
          console.log('Callback results:', cbRes);
          return cbRes;
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

const cloneInterface = (anInterface) => {
  const clone = {};
  const keys = Object.keys(anInterface);
  for (const key of keys) {
    const fn = anInterface[key];
    clone[key] = wrapFunction(fn);
  }
  return clone;
};

// Usage

const interfaceName = {
  methodName(par1, par2, callback) {
    console.dir({ par1, par2 });
    callback(null, { field: 'value' });
    return par1;
  }
};

const cloned = cloneInterface(interfaceName);
cloned.methodName('Uno', 'Due', (err, data) => {
  console.log({ err, data });
  return true;
});
