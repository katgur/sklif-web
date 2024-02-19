const mapRole = {
    'Врач': 'DOCTOR',
    'Администратор': 'ADMIN_LOCAL',
    'Глобальный администратор': 'ADMIN_GLOBAL',
    'DOCTOR': 'Врач',
    'ADMIN_LOCAL': 'Администратор',
    'ADMIN_GLOBAL': 'Глобальный администратор',
}

export const mapIfRole = (value) => {
    if (value === 'Врач' || value === 'Администратор' || value === 'Глобальный администратор') {
        return mapRole[value];
    }
    return value;
}

export const mapUpdateOriganizationForServer = (organization) => {
    organization.administratorFullName = `${organization.administratorLastName} ${organization.administratorFirstName} ${organization.administratorPatronymic}`;
    organization.organizationName = null;
    organization.email = null;
    return organization;
}

export const mapUserForServer = (user) => {
    user.role = mapRole[user.role];
    return user;
}

export const mapUsersForClient = (users) => {
    return users.map(mapUserForClient);
}

export const mapUserForClient = (user) => {
    return { ...user, role: mapRole[user.role] }
}

export const mapChangeUserRole = (params) => {
    params.previousRole = mapRole[params.previousRole];
    params.newRole = mapRole[params.newRole];
    return params;
}

export const splitAdminFullName = (org) => {
    const [administratorFirstName, administratorLastName, administratorPatronymic] = org.administratorFullName.split(" ");
    delete org.administratorFullName;
    return { ...org, administratorFirstName, administratorLastName, administratorPatronymic };
}

export const joinAdminFullName = (org) => {
    const administratorFullName = `${org.administratorFirstName} ${org.administratorLastName} ${org.administratorPatronymic}`;
    delete org.administratorFirstName;
    delete org.administratorLastName;
    delete org.administratorPatronymic;
    return { ...org, administratorFullName };
}