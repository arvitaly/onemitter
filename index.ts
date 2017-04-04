export class Onemitter<T> {
    protected listeners: Array<(value: T) => any> = [];
    public emit(value: T) {
        this.listeners.map((cb) => cb(value));
    }
    public on(cb: (value: T) => any) {
        this.listeners.push(cb);
    }
    public off(cb: (value: T) => any) {
        this.listeners = this.listeners.filter((c) => c !== cb);
    }
    public addListener(cb: (value: T) => any) {
        this.on(cb);
    }
    public removeAllListeners() {
        this.listeners = [];
    }
    public wait(): Promise<T> {
        let resolveSave: (data: T) => void;
        return new Promise((resolve) => {
            resolveSave = resolve;
            this.on(resolveSave);
        }).then((data: T) => {
            this.off(resolveSave);
            return data;
        });
    }
}
export default <T>() => {
    return new Onemitter<T>();
};
