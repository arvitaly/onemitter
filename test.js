var o = require('.'), test1 = "test1", test2 = "test2", test3 = "test3", control1;
var o1 = o();
var dispose = o1(function (value) {
    control1 = value;
});
o1(test1);
console.assert(test1 === control1, "Control value " + control1 + " not equal to " + test1);
o1(test2);
console.assert(test2 === control1, "Control value " + control1 + " not equal to " + test2);
dispose();
console.assert(test2 === control1, "Control value " + control1 + " should not changed");