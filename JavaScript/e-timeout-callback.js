'use strict';

// Wrapper will prevent call after timeout

const timeout = (msec, f) => {
  let timer = setTimeout(() => {
    if (timer) console.log('Function timedout');
    timer = null;
  }, msec);
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      return f(...args);
    } else {
      return [new Error('timeout for callback'), null];
    }
  };
};

const wrapFunction = f => {
  console.log('Wrap function:', f.name);
  return (...args) => {
    console.log('Called wrapper for:', f.name);
    console.dir({ args });
    if (args.length > 0) {
      const callback = args[args.length - 1];
      if (typeof callback === 'function') {
        const timeoutCallback = timeout(500, callback);
        args[args.length - 1] = (...args) => {
          console.log('Callback:', f.name);
          const cbRes = timeoutCallback(...args);
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

const cloneInterface = anInterface => {
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
    setTimeout(() => {
      callback(null, { field: 'value' });
    }, 300);
    return par1;
  },
  methodName2(par1, par2, callback) {
    console.dir({ par1, par2 });
    setTimeout(() => {
      callback(null, { field: 'value2' });
    }, 700);
    return par1;
  },
};

const cloned = cloneInterface(interfaceName);

cloned.methodName('Uno', 'Due', (err, data) => {
  console.log({ err, data });
  return true;
});

cloned.methodName2('Tre', 'Quattro', (err, data) => {
  console.log({ err, data });
  return true;
});
