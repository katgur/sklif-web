export const _code = "test";

const getToken = async (code) => {
    if (_code !== code) {
        throw new Error("Unauthorized");
    }
    return {
        id_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDg1MDYzMDcsImV4cCI6MTc0MDA0MjMwNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImZpcnN0X25hbWUiOiLQn9C-0LvRjNC30L7QstCw0YLQtdC70YwiLCJsYXN0X25hbWUiOiLQotC10YHRgtC-0LLRi9C5IiwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiYXV0aG9yaXRpZXMiOiJET0NUT1IifQ.-V6Nntv7Kw7GAaeh-NPmo1jzlo6RDn44Ml67DYNdCaw",
        access_token: "",
        refresh_token: "refresh_token",
    }
}

const refreshToken = async (refresh_token) => {
    if (refresh_token !== "refresh_token") {
        throw new Error("Unauthorized");
    }
    return {
        id_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDg1MDYzMDcsImV4cCI6MTc0MDA0MjMwNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImZpcnN0X25hbWUiOiLQn9C-0LvRjNC30L7QstCw0YLQtdC70YwiLCJsYXN0X25hbWUiOiLQotC10YHRgtC-0LLRi9C5IiwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiYXV0aG9yaXRpZXMiOiJET0NUT1IifQ.-V6Nntv7Kw7GAaeh-NPmo1jzlo6RDn44Ml67DYNdCaw",
        access_token: "",
        refresh_token: "refresh_token",
    }
}

export default { getToken, refreshToken }