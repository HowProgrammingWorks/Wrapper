'use strict';

class Wrapper {
  constructor(limit, fn) {
    this.count = limit;
    this.calls = 0;
    this.pause = false;
    this.fn = fn;
    this.timedout = false;
  }

  call(...args) {
    if (this.timedout) return;
    if (this.calls === this.count) throw new Error('Limit reached');
    else if (!this.pause) {
      this.calls++;
      return this.fn(...args);
    }
  }

  stop() {
    if (this.pause) this.pause = false;
    else this.pause = true;
    return this;
  }

  timeout(msec) {
    let timer = setTimeout(() => {
      if (timer) {
        timer = null;
        console.log('Function timedout');
        this.timedout = true;
      }
    }, msec);
    return this;
  }

  print() {
    console.log(`Calls: ${this.calls}\nFunction: ${this.fn}`);
    return this;
  }
}

//USAGE

const fn = par => {
  console.log('Function called, par:', par);
};

const fnLim = new Wrapper(3, fn);
fnLim.call(1);
fnLim.print();
fnLim.stop();
fnLim.call(2);
fnLim
  .stop()
  .timeout(100);
setTimeout(() => fnLim.call(3), 150);
fnLim.call(4);
