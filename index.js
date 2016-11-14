var onemitter = function () {
    var value = undefined;
    var listeners = [];
    var Onemitter = function (cb) {
        if (typeof (cb) === "function") {
            listeners.push(cb);
            return function () {
                listeners = listeners.filter(function (l) {
                    return l === cb;
                })
            }
        } else {
            listeners.map(function (l) {
                l(cb);
            });
        }
    }
    Onemitter.isOnemitter = function(){
        return true;
    }
    return Onemitter;
}

onemitter.default = onemitter;
module.exports = onemitter;