const getMaskMock = {
    data: {
        key: 'HSE/ai-masks/SE0001/',
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
        key: 'HSE/ai-masks/SE0001/',
        status: 'READY',
        totalVolume: 3304.25,
        percentage: 100,
    }
}

const delay = (ms, mock) => {
    return new Promise(resolve => setTimeout(() => resolve(mock), ms));
}

let calledPending = false;

const maskMock = (endpoint) => {
    if (endpoint === '/get_mask') {
        return delay(1000, getMaskMock);
    } else if (endpoint === '/get_results') {
        if (calledPending) {
            return delay(1000, getResultsMock);
        } else {
            calledPending = true;
            return delay(1000, getPendingResultMock);
        }
    }
}

export default maskMock;