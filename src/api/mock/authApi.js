export const _code = "test";
export let idToken;

export const setClientLogin = (login) => {
    const payload = btoa(JSON.stringify({
        email: `${login}@mail.com`,
        authorities: login,
    }));
    idToken = ["header", payload, "sign"].join('.');
}

const getToken = async (code) => {
    if (_code !== code) {
        throw new Error("Unauthorized");
    }
    return {
        id_token: idToken,
        access_token: "",
        refresh_token: "refresh_token",
    }
}

const refreshToken = async (refresh_token) => {
    if (refresh_token !== "refresh_token") {
        throw new Error("Unauthorized");
    }
    return {
        id_token: idToken,
        access_token: "",
        refresh_token: "refresh_token",
    }
}

export default { getToken, refreshToken }