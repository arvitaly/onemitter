import onemitter, { Onemitter } from "./..";
describe("Onemitter spec", () => {
    it("when create onemitter, should has isOnemitter property with `true` value ", () => {
        const o1 = onemitter({ value: "initialValue" });
        expect(o1 instanceof Onemitter).toBeTruthy();
        expect(o1.get()).toBe("initialValue");
    });
    it("when subscribe and set value should call callback-function", () => {
        const o1 = onemitter<string>();
        const cb = jest.fn();
        o1.on(cb);
        o1.emit("test1");
        expect(cb.mock.calls).toEqual([["test1"]]);
    });
    it("when set new value should call again", () => {
        const o1 = onemitter<number>();
        const cb = jest.fn();
        o1.on(cb);
        o1.emit(100);
        o1.emit(200);
        expect(cb.mock.calls).toEqual([[100], [200]]);
    });
    it("when subscribe should return dispose and when set new value should not call", () => {
        const o1 = onemitter();
        const cb = jest.fn();
        o1.on(cb);
        o1.emit("test3");
        o1.off(cb);
        o1.emit("test4");
        expect(cb.mock.calls.length).toBe(1);
    });
    it("wait", (done) => {
        const o1 = onemitter();
        o1.wait().then((data) => {
            expect(data).toBe("test15");
            done();
        });
        o1.emit("test15");
    });
    it("has, expect `false` when not have value", () => {
        const o1 = onemitter({});
        expect(o1.has()).toBe(false);
    });
    it("has, expect `true` when have value", () => {
        const o1 = onemitter({ value: "test" });
        expect(o1.has()).toBe(true);
    });
    it("get, throw error when not have value", () => {
        const o1 = onemitter();
        expect(o1.get.bind(o1)).toThrowError("Not have value");
    });
    it("get, return value when have value", () => {
        const o1 = onemitter({ value: "test" });
        expect(o1.get()).toBe("test");
    });

    it("onAndGet should call immediately if value existing", () => {
        const o1 = onemitter({ value: "test" });
        const cb = jest.fn();
        o1.onAndGet(cb);
        expect(cb.mock.calls).toEqual([["test"]]);
    });
    it("onAndGet should not call immediately if value not existing", () => {
        const o1 = onemitter();
        const cb = jest.fn();
        o1.onAndGet(cb);
        expect(cb.mock.calls.length).toBe(0);
    });
});
