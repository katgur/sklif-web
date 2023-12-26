const getMaskMock = {
    data: {
        key: 'https://storage.yandexcloud.net/news-platform-user-images/HSE/ai-masks/7777/IM000005_mask.jpg',
    }
}

const getPendingResultMock = {
    data: {
        key: 'HSE/ai-masks/SE0001/',
        status: 'IN_PROGRESS',
        totalVolume: null,
        percentage: 46,
    }
}

const getResultsMock = {
    data: {
        key: 'https://storage.yandexcloud.net/news-platform-user-images/HSE/ai-masks/7777/IM000005_mask.jpg',
        status: 'READY',
        totalVolume: 3304.25,
        percentage: 100,
    }
}

const delay = (ms, mock) => {
    return new Promise(resolve => setTimeout(() => resolve(mock), ms));
}

let calledPending = false;

const maskMock = async (endpoint) => {
    if (endpoint === '/get_mask') {
        return await delay(1000, getMaskMock);
    } else if (endpoint === '/get_results') {
        if (calledPending) {
            return await delay(1000, getResultsMock);
        } else {
            calledPending = true;
            return await delay(1000, getPendingResultMock);
        }
    }
}

export default maskMock;