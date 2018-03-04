export class Onemitter<T> {
    protected listeners: Array<(value: T) => any> = [];
    constructor(protected value?: T) { }
    public emit(value: T) {
        this.value = value;
        this.listeners.map((cb) => cb(value));
    }
    public get() {
        return this.value;
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
        const currentData = this.get();
        if (typeof (currentData) !== "undefined") {
            return Promise.resolve(currentData);
        }
        return new Promise((resolve) => {
            const bindOn = (data: T) => {
                resolve(data);
                this.off(bindOn);
            };
            this.on(bindOn);
        });
    }
}
export default <T>(initialValue?: T) => {
    return new Onemitter<T>(initialValue);
};
