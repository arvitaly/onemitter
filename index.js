"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("./Container");
exports.Container = Container_1.default;
class Onemitter {
    constructor(store = {}) {
        this.store = store;
        this.isValueExisting = false;
        this.listeners = [];
    }
    emit(value) {
        this.store.value = value;
        this.listeners.map((cb) => cb(value));
    }
    get() {
        return this.store.value;
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
        if ("value" in this.store) {
            return Promise.resolve(this.store.value);
        }
        return new Promise((resolve) => {
            const bindOn = (data) => {
                resolve(data);
                this.off(bindOn);
            };
            this.on(bindOn);
        });
    }
}
exports.Onemitter = Onemitter;
exports.default = (initialValue) => {
    return new Onemitter(initialValue);
};
