import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/organizationApi';
import { addSuccess, addError } from '../notification/notificationSlice';

const wrapper = (api, action, message) => (...args) => dispatch => {
    api(...args)
        .then(data => {
            dispatch(action(data));
            dispatch(addSuccess(message));
        })
        .catch(error => {
            dispatch(addError(`${message}: {${error.message}`))
        })
}



// org => {
//     return dispatch => {
//         api.postOrganization(org)
//             .then(newOrg => {
//                 dispatch(addOrg(newOrg));
//                 dispatch(addSuccess(`Организация ${newOrg.name} добавлена`));
//             })
//             .catch(error => {
//                 dispatch(addError(`Не удалось добавить организацию${error.message ? `: ${error.message}` : ""}`))
//             })
//     }
// }

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
                dispatch(addError(`Не удалось редактировать данные организации${error.message ? `: ${error.message}` : ""}`))
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
                dispatch(addError(`Не удалось удалить данные организации${error.message ? `: ${error.message}` : ""}`))
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
                dispatch(addError(`Не удалось получить список организаций${error.message ? `: ${error.message}` : ""}`))
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

export const addOrganization = wrapper(api.postOrganization, addOrg, "Регистрация организации");

export const selectAll = (state) => state.org;

export default orgSlice.reducer;