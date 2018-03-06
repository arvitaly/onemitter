"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const Container_1 = require("./Container");
const onemitter1 = _1.default();
const cb1 = jest.fn();
let container;
beforeEach(() => {
    container = new Container_1.default();
    cb1.mockClear();
});
it("add to onemitter container", () => {
    container.on(onemitter1, cb1);
    onemitter1.emit("test1");
    expect(cb1.mock.calls).toEqual([["test1"]]);
});
it("remove from onemitter container", () => {
    container.on(onemitter1, cb1);
    container.off(cb1);
    onemitter1.emit("test1");
    expect(cb1.mock.calls.length).toBe(0);
});
it("remove all listeners from container", () => {
    container.on(onemitter1, cb1);
    onemitter1.emit("testx");
    container.removeAllListeners();
    expect(cb1.mock.calls.length).toBe(1);
});
