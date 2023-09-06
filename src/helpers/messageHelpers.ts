export const getId = ():number => {
    const secs = new Date().getTime()
    const max = 999999;
    const min = 100000;
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return secs + rand;
};
