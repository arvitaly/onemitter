"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor() {
        this.emitters = [];
    }
    on(emitter, cb) {
        this.emitters.push({ emitter, cb });
        emitter.on(cb);
    }
    off(cb) {
        let index = -1;
        const emitter = this.emitters.filter((e, i) => {
            index = i;
            return e.cb === cb;
        })[0];
        if (!emitter) {
            throw new Error("Not found subscription for this callback");
        }
        emitter.emitter.off(cb);
        this.emitters.splice(index, 1);
    }
    removeAllListeners() {
        this.emitters.forEach((e) => e.emitter.off(e.cb));
        this.emitters = [];
    }
}
exports.default = Container;
