import o, { Container } from "./";
const onemitter1 = o();
const cb1 = jest.fn();
let container: Container;
beforeEach(() => {
    container = new Container();
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
