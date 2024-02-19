const delay = (mock, ms) => {
    return new Promise(resolve => setTimeout(() => resolve(mock), ms));
}

const getMask = async (key) => {
    return delay({
        url: `https://storage.yandexcloud.net/news-platform-user-images/HSE/ai-masks/7777/${key.split("/").slice(-1)[0].split(".")[0]}_mask.jpg`,
        totalVolume: 3304.25,
    }, 500)
}

export default { getMask };