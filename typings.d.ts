type subscribe <T> = (cb: (data: T) => any) => () => void;
type publish<T> = (value: T) => void;
type onemitter<T> = () => subscribe<T> & publish<T>;
export = onemitter;