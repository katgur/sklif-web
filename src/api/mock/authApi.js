export const _code = "test";

const getIdToken = () => {
    const login = sessionStorage.getItem("login");
    const payload = btoa(JSON.stringify({
        email: `${login}@mail.com`,
        authorities: login,
    }));
    return ["header", payload, "sign"].join('.');
}

const getToken = async (code) => {
    if (_code !== code) {
        throw new Error("Unauthorized");
    }
    return {
        id_token: getIdToken(),
        access_token: "",
        refresh_token: "refresh_token",
    }
}

const refreshToken = async (refresh_token) => {
    if (refresh_token !== "refresh_token") {
        throw new Error("Unauthorized");
    }
    return {
        id_token: getIdToken(),
        access_token: "",
        refresh_token: "refresh_token",
    }
}

export default { getToken, refreshToken }