export default (callback, wait = 350) => {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => callback.apply(this, args), wait);
    }
}