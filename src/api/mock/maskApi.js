const delay = (mock, ms) => {
    return new Promise(resolve => setTimeout(() => resolve(mock), ms));
}

const request = (key) => delay({
    url: `https://storage.yandexcloud.net/news-platform-user-images/HSE/ai-masks/7777/${key.split("/").slice(-1)[0].split(".")[0]}_mask.jpg`,
    volume: (Math.random() * 2000 + 1000).toFixed(2),
}, 500);

const cache = {};

const getMask = async (key) => {
    if (!cache[key]) {
        cache[key] = await request(key);
    }
    return cache[key];
}

export default { getMask };