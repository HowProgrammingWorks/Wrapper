'use strict';

function cloneInterface(anInterface, beforeCall, afterCall) {
    let fn, clone = {};
    for (let key in anInterface) {
        fn = anInterface[key];
        clone[key] = wrapFunction(fn, beforeCall, afterCall);
    }
    return clone;
}

function wrapFunction(fn, beforeCall, afterCall) {
    console.log('Wrap function: ' + fn.name);
    return (...args) => {
        beforeCall();
        console.log('Called wrapper for: ' + fn.name);
        console.dir({ args });
        fn.apply(undefined, args);
        console.log('Ended wrapper for: ' + fn.name);
        afterCall();
    };
}

let interfaceName = {
    methodName: function(par1, par2) {
        console.dir({ method: { par1, par2 } });
    }
};

let cloned = cloneInterface(interfaceName,
                                            ()=>console.log('aaaaa'),
                                            ()=>console.log('zzzzz')
                            );
cloned.methodName('Uno', 'Due');
