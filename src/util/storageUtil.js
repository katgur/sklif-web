export const isDirectory = (key) => {
    return key.slice(-1) === "/";
}

export const isFile = (key) => {
    return !isDirectory(key);
}