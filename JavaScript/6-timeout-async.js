'use strict';

// Wrapper will prevent call after timeout

const timeout = (fntime, cbtime, fn) => {
  let timer = setTimeout(() => {
    if (timer) console.log('Function timedout');
    timer = null;
  }, fntime);
  return (...args) => {
    if (timer) {
      const callback = args[args.length - 1];
      if (typeof callback === 'function') {
        let cbTimer = setTimeout(() => {
          if (cbTimer) console.log('Callback timedout');
          cbTimer = null;
        }, cbtime);

        args[args.length - 1] = (...pars) => {
          if (cbTimer) {
            clearTimeout(cbTimer);
            cbTimer = null;
            return callback(...pars);
          }
        };
      }

      clearTimeout(timer);
      timer = null;
      return fn(...args);
    }
  };
};

// Usage

const fn = (par, callback) => {
  console.log('Function called, par:', par);
  setTimeout(() => callback(null, par), 150);
};

const fn100 = timeout(100, 150, fn);
const fn150 = timeout(150, 100, fn);
const fn200 = timeout(200, 250, fn);

setTimeout(() => {
  fn100('first', (err, data) => {
    console.log('Callback first', data);
  });
  fn150('second', (err, data) => {
    console.log('Callback second', data);
  });
  fn200('third', (err, data) => {
    console.log('Callback third', data);
  });
}, 100);
