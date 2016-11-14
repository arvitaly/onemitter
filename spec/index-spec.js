var onemitter = require('./..');
describe("Onemitter spec", () => {
    it("when import should has default export", () => {
        expect(onemitter.default).toBe(onemitter);
    })
    it("when create onemitter, should has isOnemitter property with `true` value ", () => {
        var o1 = onemitter();
        expect(o1.isOnemitter).toBe(true);
    })
    it("when subscribe and set value should call callback-function", () => {
        var o1 = onemitter();
        var cb = jasmine.createSpy();
        o1(cb);
        o1("test1");
        expect(cb.calls.allArgs()).toEqual([["test1"]]);
    })
    it("when set new value should call again", () => {
        var o1 = onemitter();
        var cb = jasmine.createSpy();
        o1(cb);
        o1("test1");
        o1("test2");
        expect(cb.calls.allArgs()).toEqual([["test1"], ["test2"]]);
    })
    it("when subscribe should return dispose and when set new value should not call", () => {
        var o1 = onemitter();
        var cb = jasmine.createSpy();
        var dispose = o1(cb);
        o1("test3");
        dispose();
        o1("test4");
        expect(cb.calls.count()).toBe(1);
    })
})