const globalKey = 'swkey'

const delay = (fn, ms) => {
    return new Promise(resolve => setTimeout(() => resolve(fn()), ms));
}

const setAll = async (value) => await delay(
    () => {
        localStorage.setItem(globalKey, JSON.stringify(value));
    }, 150
)

const getAll = async () => await delay(
    () => {
        const value = JSON.parse(localStorage.getItem(globalKey));
        if (!value) {
            localStorage.setItem(globalKey, JSON.stringify({}));
            return {};
        }
        return value;
    }, 150
)

const get = async (key, mock = []) => {
    const value = await getAll();
    if (value[key] === undefined) {
        value[key] = mock;
        await setAll(value);
    }
    return value[key];
}

const set = async (key, data) => {
    const value = await getAll();
    value[key] = data;
    await setAll(value);
}

export default {
    get, set
}