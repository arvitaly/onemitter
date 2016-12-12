"use strict";
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
}
exports.Onemitter = Onemitter;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    return new Onemitter();
};
