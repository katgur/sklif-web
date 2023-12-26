const key = 'swkey'

const delay = (fn, ms) => {
    return new Promise(resolve => setTimeout(() => resolve(fn()), ms));
}

const set = async (value) => await delay(
    () => {
        localStorage.setItem(key, JSON.stringify(value));
    }, 500
)

const get = async () => await delay(
    () => {
        const value = JSON.parse(localStorage.getItem(key));
        if (!value) {
            localStorage.setItem(key, JSON.stringify({}));
            return {};
        }
        return value;
    }, 500
)

export default {
    get, set
}