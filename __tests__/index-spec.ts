import onemitter, { Onemitter } from "./..";
describe("Onemitter spec", () => {
    it("when create onemitter, should has isOnemitter property with `true` value ", () => {
        const o1 = onemitter();
        expect(o1 instanceof Onemitter).toBeTruthy();
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
});
