import LS from './LSRequest';

const key = 'storage';

const getData = async () => {
    return await LS.get(key, [
        {
            key: 'S000001/',
            lastModified: new Date().toISOString(),
            size: 0,
        },
        {
            key: 'S000002/',
            lastModified: new Date().toISOString(),
            size: 0,
        },
        {
            key: 'S000001/000001',
            lastModified: new Date().toISOString(),
            size: 14,
        },
        {
            key: 'S000001/000002',
            lastModified: new Date().toISOString(),
            size: 17532,
        },
        {
            key: 'S000001/000003',
            lastModified: new Date().toISOString(),
            size: 17532,
        },
        {
            key: 'S000001/000004',
            lastModified: new Date().toISOString(),
            size: 17532,
        },
        {
            key: 'S000001/000005',
            lastModified: new Date().toISOString(),
            size: 17532,
        },
        {
            key: 'S000001/000006',
            lastModified: new Date().toISOString(),
            size: 17532,
        },
        {
            key: 'S000001/000007',
            lastModified: new Date().toISOString(),
            size: 17532,
        },
        {
            key: 'S000001/000008',
            lastModified: new Date().toISOString(),
            size: 17532,
        },
    ]);
}

const setData = async (data) => {
    await LS.set(key, data);
}


const getFiles = async () => {
    return await getData();
}

const postDirectory = async (key, directoryName) => {
    const data = await getData();
    const file = {
        key: `${key}${directoryName}/`,
        lastModified: new Date().toISOString(),
        size: 0,
    }
    await setData([...data, file]);
    return file;
}

const deleteDirectory = async (key) => {
    const data = await getData();
    await setData(data.filter(file => file.key !== key));
}

const postFile = async (path, files) => {
    const data = await getData();
    const newFiles = [];
    for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        newFiles.push({
            key: path + file.name,
            lastModified: new Date().toISOString(),
            size: file.size,
        });
    }
    await setData([...data, ...newFiles]);
    return newFiles;
}

const deleteFile = async (fileNames) => {
    const data = await getData();
    const set = new Set(fileNames);
    await setData(data.filter(file => !set.has(file.key)));
}

export default { getFiles, deleteFile, postDirectory, deleteDirectory, postFile };