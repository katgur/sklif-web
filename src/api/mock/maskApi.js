import maskMock from "../test/mock/maskMock"

const getMask = async (key) => {
    return await maskMock('/get_mask');
}

const getResults = async (key) => {
    return await maskMock('/get_results');
}

export { getMask, getResults };