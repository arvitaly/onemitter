# onemitter
Most elementary emitter for one event

[![Build Status](https://travis-ci.org/arvitaly/onemitter.svg?branch=master)](https://travis-ci.org/arvitaly/onemitter)
[![npm version](https://badge.fury.io/js/onemitter.svg)](https://badge.fury.io/js/onemitter)
[![Coverage Status](https://coveralls.io/repos/github/arvitaly/onemitter/badge.svg?branch=master)](https://coveralls.io/github/arvitaly/onemitter?branch=master)

# Install

    npm install --save onemitter

# Usage

    const onemitter = require('onemitter'); //commonjs
    //or
    import onemitter from 'onemitter'; //es6 or typescript

    //JavaScript
    const o1 = onemitter();
    //typescript
    const o1 = onemitter<string>();
    //Check var is onemitter
    console.log(o1.isOnemitter === true);
    //subscribe
    const dispose = o1((value)=>{
        console.log(value);
    })
    //publish
    o1("value1");
    o1("value2");
    //unsubscribe
    dispose();
    o1("value3");
    //Results
    //value1
    //value2

# Typings

    type subscribe <T> = (cb: (data: T) => any) => () => void;
    type publish<T> = (value: T) => void;
    export type IOneEmitter<T> = subscribe<T> & publish<T> & { isOnemitter: boolean };
    declare function onemitter<T>(): IOneEmitter<T>;
    export default onemitter; 
