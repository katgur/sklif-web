export const isDirectory = (key) => {
    return key.split('/').slice(-1)[0] === "";
}

export const isFile = (key) => {
    return !isDirectory(key);
}