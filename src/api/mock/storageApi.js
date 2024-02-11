import LS from './LSRequest';
import mock from './assets/IM000005.dcm'

const key = 'storage';

const get = async () => {
    let value = await LS.get();
    if (value[key] === undefined) {
        value[key] = [];
        await LS.set(value);
    }
    return value;
}

const getMockUrl = () => {
    return new Promise((resolve, reject) => {
        fetch(mock)
            .then((response) => response.blob())
            .then((blob) => URL.createObjectURL(blob))
            .then((url) => resolve(url))
            .catch((err) => reject(err));
    })
}

const url = await getMockUrl();

const getBytes = () => {
    return url

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
            {
                key: 'S000001/000003',
                date: new Date().toUTCString(),
                size: 21,
            },
            {
                key: 'S000001/000004',
                date: new Date().toUTCString(),
                size: 21,
            },
            {
                key: 'S000001/000005',
                date: new Date().toUTCString(),
                size: 21,
            },
            {
                key: 'S000001/000006',
                date: new Date().toUTCString(),
                size: 21,
            },
            {
                key: 'S000001/000007',
                date: new Date().toUTCString(),
                size: 21,
            },
            {
                key: 'S000001/000008',
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

export default { getFiles, deleteFile, postDirectory, deleteDirectory, postFile, getBytes };