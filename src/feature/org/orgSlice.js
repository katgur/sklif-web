import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/organizationApi';

export const addOrganization = (org) => {
    return {
        api: async () => await api.postOrganization(org),
        action: addOrg,
        message: {
            success: "Организация зарегистрирована",
            error: "Не удалось зарегистрировать организацию",
        }
    }
}

export const updateOrganization = (email, org) => {
    return {
        api: async () => {
            await api.patchOrganization(email, org);
            const newOrg = await api.getOrganization(org.email);
            return { email, newOrg };
        },
        action: editOrg,
        message: {
            success: "Данные организации обновлены",
            error: "Не удалось обновить данные организации",
        }
    }
}

export const deleteOrganization = email => {
    return {
        api: async () => await api.deleteOrganization(email),
        action: removeOrg,
        message: {
            success: "Данные организации удалены",
            error: "Не удалось удалить данные организации",
        }
    }
}

export const fetchOrganizations = () => {
    return {
        api: api.getOrganizations,
        action: setOrgs,
        message: {
            error: "Не удалось получить список организаций",
        }
    }
}

const orgSlice = createSlice({
    name: 'org',
    initialState: null,
    reducers: {
        addOrg: (state, action) => {
            return state ? [...state, action.payload] : [action.payload]
        },
        editOrg: (state, action) => {
            return state ? state.filter(item => item.email !== action.payload.email).concat(action.payload.org) : [action.payload.org]
        },
        removeOrg: (state, action) => {
            return state ? state.filter(item => item.email !== action.payload) : []
        },
        setOrgs: (state, action) => {
            return action.payload
        },
    },
})

export const { addOrg, editOrg, removeOrg, setOrgs } = orgSlice.actions;

export const selectAll = (state) => state.org;

export default orgSlice.reducer;