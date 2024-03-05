import { getData as getUsers } from "./userApi"
import { getData as getStorage } from "./storageApi";
import { getData as getOrganizations } from "./organizationApi";
import { getData as getStudies } from './studyApi';

function filterArray(array, filter) {
    return array.filter(item => Object.values(item).reduce((acc, value) => acc || value.includes(filter), false));
}

function mapUserForGlobalAdmin(user) {
    const newUser = { ...user };
    delete newUser.avatarURL;
    return newUser;
}

function mapUserForAdmin(user) {
    const newUser = { ...user };
    delete newUser.organization;
    delete newUser.avatarURL;
    return newUser;
}

const search = async (filter) => {
    const login = sessionStorage.getItem("login");

    if (login === "global.admin") {
        return [
            {
                title: "Пользователи",
                data: filterArray((await getUsers()).map(mapUserForGlobalAdmin), filter),
            },
            {
                title: "Организации",
                data: filterArray(await getOrganizations(), filter),
            },
        ];
    } else if (login === "admin") {
        return [
            {
                title: "Пользователи",
                data: filterArray((await getUsers()).map(mapUserForAdmin), filter),
            },
            {
                title: "Файлы",
                data: filterArray(await getStorage(), filter),
            },
        ];
    } else if (login === "doctor") {
        return [
            {
                title: "Исследования",
                data: filterArray(await getStudies(), filter),
            },
        ]
    } else {
        return [];
    }
}

export default {
    search,
}