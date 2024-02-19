import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/organizationApi';
import { addSuccess, addError } from '../notification/notificationSlice';

export const addOrganization = org => {
    return dispatch => {
        api.postOrganization(org)
            .then(newOrg => {
                dispatch(addOrg(newOrg));
                dispatch(addSuccess(`Организация ${newOrg.name} добавлена`));
            })
            .catch(error => {
                dispatch(addError(`Не удалось добавить организацию${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const updateOrganization = (email, org) => {
    return dispatch => {
        api.patchOrganization(email, org)
            .then(() => {
                dispatch(addSuccess(`Данные организации изменены`));
                return api.getOrganization(org.email);
            })
            .then(newOrg => {
                dispatch(editOrg({ email, org: newOrg }));
            })
            .catch(error => {
                dispatch(addError(`Не удалось редактировать данные организации${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const deleteOrganization = email => {
    return dispatch => {
        api.deleteOrganization(email)
            .then(() => {
                dispatch(removeOrg(email));
                dispatch(addSuccess(`Данные организации удалены`));
            })
            .catch(error => {
                dispatch(addError(`Не удалось удалить данные организации${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const fetchOrganizations = () => {
    return dispatch => {
        api.getOrganizations()
            .then(orgs => {
                dispatch(setOrgs(orgs));
            })
            .catch(error => {
                dispatch(addError(`Не удалось получить список организаций${error.response ? `: ${error.response.data.error}` : ""}`))
            })
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