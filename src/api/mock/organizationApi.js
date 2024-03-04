import LS from './LSRequest';

const key = 'org';

export const getData = async () => {
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

const patchOrganization = async (email, organization) => {
    const data = await getData();
    const oldOrganization = await getOrganization(email);
    await setData(data.filter(org => org.email !== email).concat({ ...oldOrganization, ...organization }));
}

const deleteOrganization = async (email) => {
    const data = await getData();
    const organization = await getOrganization(email);
    await setData(data.filter(org => org.email !== organization.email));
}

const getOrganizations = async () => {
    return await getData();
}

const getOrganization = async (email) => {
    const data = await getData();
    const organization = data.find(org => org.email === email);
    if (!organization) {
        throw new Error('Организация не найдена');
    }
    return organization;
}

export default { postOrganization, patchOrganization, deleteOrganization, getOrganizations, getOrganization };