import LS from './LSRequest';

const key = 'user';

const get = async () => {
    let value = await LS.get();
    if (value[key] === undefined) {
        console.log(value);
        value[key] = [];
        console.log(value);

        await LS.set(value);
    }
    return value;
}

const getUser = async (email) => {
    const value = await get();
    console.log(value, email)

    return value[key].find(user => user.email === email);
}

const changePassword = async () => {
    return true;
}

const changeUserInfo = async ({ userInfo, email }) => {
    let value = await get();
    const user = { ...value[key].find(user => user.email === email), ...userInfo };
    value[key] = value[key].filter(user => user.email !== email);
    value[key].push(user);
    await LS.set(value);
    return user;
}

const changeEmail = async ({ previousEmail, newEmail }) => {
    let value = await get();
    let user = value[key].find(user => user.email === previousEmail);
    user.email = newEmail;
    value[key] = value[key].filter(user => user.email !== previousEmail);
    value[key].push(user);
    await LS.set(value);
    return user;
}

const changeUserRole = async ({ newRole, email }) => {
    let value = await get();
    let user = value[key].find(user => user.email === email);
    user.role = newRole;
    value[key] = value[key].filter(user => user.email !== email);
    value[key].push(user);
    await LS.set(value);
    return user;
}

const postUser = async (user) => {
    let value = await get();
    value[key].push(user);
    await LS.set(value);
    return user;
}

const getUsers = async ({ filter }) => {
    const value = await get();
    return value[key].filter(user => user.firstName.includes(filter));
}

const deleteUser = async ({ email }) => {
    const value = await get();
    value[key] = value[key].filter(user => user.email !== email);
    await LS.set(value);
}

const postAvatar = () => {
    return true;
}

export {
    getUser, changePassword, changeUserInfo, changeEmail,
    changeUserRole, postUser, getUsers, deleteUser, postAvatar
};