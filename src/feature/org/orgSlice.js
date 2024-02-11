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

export const updateOrganization = org => {
    return dispatch => {
        api.patchOrganization(org)
            .then(newOrg => {
                dispatch(editOrg(newOrg));
                dispatch(addSuccess(`Данные организации ${newOrg.name} изменены`));
            })
            .catch(error => {
                dispatch(addError(`Не удалось редактировать данные организации${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const removeOrganization = email => {
    return dispatch => {
        api.deleteOrganization(email)
            .then(() => {
                dispatch(deleteOrg(email));
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

export const fetchOrganization = email => {
    return dispatch => {
        api.getOrganization(email)
            .then(orgs => {
                dispatch(setCurrent(orgs));
            })
            .catch(error => {
                dispatch(addError(`Не удалось получить данные организации${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

const orgSlice = createSlice({
    name: 'org',
    initialState: {
        list: [],
        current: null,
    },
    reducers: {
        addOrg: (state, action) => {
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        },
        editOrg: (state, action) => {
            return {
                ...state,
                list: state.list.filter(item => item.email !== action.payload.email).concat(action.payload)
            }
        },
        deleteOrg: (state, action) => {
            return {
                ...state,
                list: state.list.filter(item => item.email !== action.payload.email)
            }
        },
        setOrgs: (state, action) => {
            return {
                ...state,
                list: action.payload
            }
        },
        setCurrent: (state, action) => {
            return {
                ...state,
                current: action.payload
            }
        },
        resetCurrent: (state, action) => {
            return {
                ...state,
                current: null,
            }
        }
    },
})

export const { addOrg, editOrg, deleteOrg, setOrgs, setCurrent, resetCurrent } = orgSlice.actions;

export const selectCurrent = (state) => state.org.current;
export const selectAll = (state) => state.org.list;

export default orgSlice.reducer;