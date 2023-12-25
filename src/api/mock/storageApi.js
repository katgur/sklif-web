import LS from './LSRequest';

const key = 'storage';

const get = async () => {
    let value = await LS.get();
    if (value[key] === undefined) {
        value[key] = [];
        await LS.set(value);
    }
    return value;
}

const getBytes = () => {
    return true;
}

const getFiles = async () => {
    const value = await get();
    if (value[key].length === 0) {
        value[key] = [
            {
                key: 'S000001/',
                date: new Date().toUTCString(),
                size: 0,
            },
            {
                key: 'S000002/',
                date: new Date().toUTCString(),
                size: 0,
            },
            {
                key: 'S000001/000001',
                date: new Date().toUTCString(),
                size: 14,
            },
            {
                key: 'S000001/000002',
                date: new Date().toUTCString(),
                size: 21,
            },
        ]
        await LS.set(value);
    }
    return value[key];
}

const deleteFile = async ({ fileNames }) => {
    let value = await get();
    value[key] = value[key].filter(file => !fileNames.includes(file.key));
    await LS.set(value);
}

const postDirectory = async ({ path }) => {
    let value = await get();
    value[key].push({
        key: path + "/",
        date: new Date().toUTCString(),
        size: 0,
    });
    await LS.set(value);
}

const postFile = async ({ path, files }) => {
    console.log(files)
    let value = await get();
    for (let i = 0; i < files.length; i++) {
        let file = files.item(i)
        value[key].push({
            key: path + file.name,
            date: file.lastMofifiedDate,
            size: file.size,
        })
    }
    await LS.set(value);
}

const deleteDirectory = async ({ folderName }) => {
    let value = await get();
    folderName += "/";
    value[key] = value[key].filter(file => file.key !== folderName);
    await LS.set(value);
}

export { getFiles, deleteFile, postDirectory, deleteDirectory, postFile, getBytes };