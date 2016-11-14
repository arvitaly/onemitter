type subscribe <T> = (cb: (data: T) => any) => () => void;
type publish<T> = (value: T) => void;
export type IOneEmitter<T> = subscribe<T> & publish<T> & { isOnemitter: boolean };
declare function onemitter<T>(): IOneEmitter<T>;
export default onemitter; 