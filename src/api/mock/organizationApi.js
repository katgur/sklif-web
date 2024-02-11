import LS from './LSRequest';

const key = 'org';

const get = async () => {
    let value = await LS.get();
    if (value[key] === undefined) {
        value[key] = [];
        await LS.set(value);
    }
    return value;
}
const postOrganization = async (organization) => {
    let value = await get();
    value[key].push(organization);
    await LS.set(value);
    return organization;
}

const patchOrganization = async (organization) => {
    let value = await get();
    value[key] = value[key].filter(org => org.email !== organization.email);
    value[key].push(organization);
    await LS.set(value);
    return organization;
}

const deleteOrganization = async (email) => {
    const value = await get();
    value[key] = value[key].filter(org => org.email !== email);
    await LS.set(value);
}

const getOrganizations = async (params) => {
    const value = await get();
    return value[key];
}

const getOrganization = async (email) => {
    const value = await get();
    return value[key].find(org => org.email === email);
}

export default { postOrganization, patchOrganization, deleteOrganization, getOrganizations, getOrganization };