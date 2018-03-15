export { default as Container } from "./Container";
export class Onemitter<T> {
    protected isValueExisting = false;
    protected listeners: Array<(value: T) => any> = [];
    protected store: { value?: T };
    constructor(config: { value?: T } = {}) {
        this.store = { ...config };
    }
    public emit(value: T) {
        this.store.value = value;
        this.listeners.map((cb) => cb(value));
    }
    public get() {
        return this.store.value;
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
        if ("value" in this.store) {
            return Promise.resolve(this.store.value as T);
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
export default <T>(config?: { value?: T }) => {
    return new Onemitter<T>(config);
};
