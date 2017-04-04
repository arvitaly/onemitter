"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Onemitter {
    constructor() {
        this.listeners = [];
    }
    emit(value) {
        this.listeners.map((cb) => cb(value));
    }
    on(cb) {
        this.listeners.push(cb);
    }
    off(cb) {
        this.listeners = this.listeners.filter((c) => c !== cb);
    }
    addListener(cb) {
        this.on(cb);
    }
    removeAllListeners() {
        this.listeners = [];
    }
    wait() {
        let resolveSave;
        return new Promise((resolve) => {
            resolveSave = resolve;
            this.on(resolveSave);
        }).then((data) => {
            this.off(resolveSave);
            return data;
        });
    }
}
exports.Onemitter = Onemitter;
exports.default = () => {
    return new Onemitter();
};
