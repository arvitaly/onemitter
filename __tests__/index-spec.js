"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("./..");
describe("Onemitter spec", () => {
    it("when create onemitter, should has isOnemitter property with `true` value ", () => {
        const o1 = __1.default("initialValue");
        expect(o1 instanceof __1.Onemitter).toBeTruthy();
        expect(o1.get()).toBe("initialValue");
    });
    it("when subscribe and set value should call callback-function", () => {
        const o1 = __1.default();
        const cb = jest.fn();
        o1.on(cb);
        o1.emit("test1");
        expect(cb.mock.calls).toEqual([["test1"]]);
    });
    it("when set new value should call again", () => {
        const o1 = __1.default();
        const cb = jest.fn();
        o1.on(cb);
        o1.emit(100);
        o1.emit(200);
        expect(cb.mock.calls).toEqual([[100], [200]]);
    });
    it("when subscribe should return dispose and when set new value should not call", () => {
        const o1 = __1.default();
        const cb = jest.fn();
        o1.on(cb);
        o1.emit("test3");
        o1.off(cb);
        o1.emit("test4");
        expect(cb.mock.calls.length).toBe(1);
    });
    it("wait", (done) => {
        const o1 = __1.default();
        o1.wait().then((data) => {
            expect(data).toBe("test15");
            done();
        });
        o1.emit("test15");
    });
});
