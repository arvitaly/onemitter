import { Onemitter } from ".";

interface IEmitterCallback {
    emitter: Onemitter<any>;
    cb: (value: any) => void;
}
class Container {
    protected emitters: IEmitterCallback[] = [];
    public on<T>(emitter: Onemitter<T>, cb: (value: T) => void) {
        this.emitters.push({ emitter, cb });
        emitter.on(cb);
    }
    public off(cb: (value: any) => void) {
        let index = -1;
        const emitter = this.emitters.filter((e, i) => {
            index = i;
            return e.cb === cb;
        })[0];
        if (!emitter) {
            throw new Error("Not found subscription for this callback");
        }
        emitter.emitter.off(cb);
        this.emitters.splice(index, 1);
    }
    public removeAllListeners() {
        this.emitters.forEach((e) => e.emitter.off(e.cb));
        this.emitters = [];
    }
}
export default Container;
