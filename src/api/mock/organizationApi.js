import LS from './LSRequest';

const key = 'org';

const getData = async () => {
    return await LS.get(key, [
        {
            "email": "hse@hse.ru",
            "name": "HSE",
            "administratorFullName": "Test Test Test",
            "phoneNumber": "098",
            "address": "Ulitsa Sezam"
        }
    ]);
}

const setData = async (data) => {
    await LS.set(key, data);
}

const postOrganization = async (organization) => {
    const data = await getData();
    await setData(data.concat(organization));
    return organization;
}

const patchOrganization = async (organization) => {
    const data = await getData();
    await setData(data.filter(org => org.email !== organization.email).concat(organization));
}

const deleteOrganization = async (email) => {
    const data = await getData();
    await setData(data.filter(org => org.email !== email));
}

const getOrganizations = async () => {
    const data = await getData();
    return data;
}

const getOrganization = async (email) => {
    const data = await get();
    return data.find(org => org.email === email);
}

export default { postOrganization, patchOrganization, deleteOrganization, getOrganizations, getOrganization };