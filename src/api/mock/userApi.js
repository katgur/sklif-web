import LS from './LSRequest';

const key = 'user';

const getData = async () => {
    return await LS.get(key, [
        {
            "email": "lrezunic@gmail.com",
            "firstName": "Людмила",
            "lastName": "Резуник",
            "patronymic": "Александровна",
            "phoneNumber": "+79129329178",
            "role": "Врач",
            "organization": "HSE"
        }
    ]);
}

const setData = async (data) => {
    await LS.set(key, data);
}

const getUser = async (email) => {
    const data = await getData();
    const user = data.find(user => user.email === email);
    if (!user) {
        throw new Error("Пользователь не найден");
    }
    return user;
}

const changePassword = async (email, newPassword) => {
    const data = await getData();
    const user = { ...(await getUser(email)), password: newPassword };
    await setData(data.filter(user => user.email !== email).concat(user));
}

const changeUserInfo = async (email, userInfo) => {
    const data = await getData();
    const user = { ...(await getUser(email)), ...userInfo };
    await setData(data.filter(user => user.email !== email).concat(user));
}

const changeEmail = async (previousEmail, newEmail) => {
    const data = await getData();
    const user = await getUser(previousEmail);
    await setData(data.filter(user => user.email !== previousEmail).concat({ ...user, email: newEmail }));
}

const changeUserRole = async (email, newRole) => {
    const data = await getData();
    const user = await getUser(email);
    await setData(data.filter(user => user.email !== email).concat({ ...user, role: newRole }));
}

const postUser = async (user) => {
    const data = await getData();
    await setData(data.concat(user));
    return user;
}

const getUsers = async (filter) => {
    const data = await getData();
    return data.filter(user => user.firstName.includes(filter));
}

const deleteUser = async (email) => {
    const data = await getData();
    await setData(data.filter(user => user.email !== email));
}

const postAvatar = (file) => {
    return true;
}

export default {
    getUser, changePassword, changeUserInfo, changeEmail,
    changeUserRole, postUser, getUsers, deleteUser, postAvatar
};