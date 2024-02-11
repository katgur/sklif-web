import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteOrganization, getOrganization, getOrganizations, patchOrganization, postOrganization } from '../../api/mock/organizationApi';
import { mapUpdateOriganizationForServer } from '../../util/mapper';

export const addOrganization = createAsyncThunk('org/add', async (params, thunk) => {
    return await postOrganization(params);
})

export const updateOrganization = createAsyncThunk('org/update', async (params, thunk) => {
    return await patchOrganization(params);
})

export const removeOrganization = createAsyncThunk('org/remove', async (params, thunk) => {
    return await deleteOrganization(params);
})

export const fetchOrganizations = createAsyncThunk('org/fetchAll', async (params, thunk) => {
    return await getOrganizations();
})

export const fetchOrganization = createAsyncThunk('org/fetch', async (params, thunk) => {
    return await getOrganization(params);
})

const orgSlice = createSlice({
    name: 'org',
    initialState: {
        status: {
            message: undefined,
            code: undefined,
        },
        data: [{
            name: "Ромашка",
            email: "mail@mail.com"
        }],
        current: undefined,
        progress: false,
    },
    reducers: {
        resetStatus: (state, action) => {
            state.status = {
                message: undefined,
                code: undefined,
            }
        },
        resetCurrent: (state, action) => {
            state.current = undefined;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addOrganization.fulfilled, (state, action) => {
                state.status = {
                    message: "Организация добавлена",
                    code: 3,
                }
                state.progress = false;
            })
            .addCase(addOrganization.rejected, (state, action) => {
                console.log(state, action)

                state.status = {
                    message: `Не удалось добавить организацию${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(updateOrganization.fulfilled, (state, action) => {
                state.status = {
                    message: "Организация изменена",
                    code: 3,
                }
                state.progress = false;
            })
            .addCase(updateOrganization.rejected, (state, action) => {
                state.status = {
                    message: `Не удалось изменить данные организации${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(removeOrganization.fulfilled, (state, action) => {
                state.status = {
                    message: "Организация удалена",
                    code: 3,
                }
                state.progress = false;
            })
            .addCase(removeOrganization.rejected, (state, action) => {
                state.status = {
                    message: `Не удалось удалить организацию${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(fetchOrganizations.fulfilled, (state, action) => {
                state.data = action.payload;
                console.log(action)
                state.progress = false;
            })
            .addCase(fetchOrganizations.rejected, (state, action) => {
                state.status = {
                    message: `Не удалось получить список организаций ${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(fetchOrganization.fulfilled, (state, action) => {
                var organization = action.payload;
                state.current = organization;
                state.progress = false;
            })
            .addCase(fetchOrganization.rejected, (state, action) => {
                state.status = {
                    message: `Не удалось получить данные организации${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(fetchOrganization.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(fetchOrganizations.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(removeOrganization.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(updateOrganization.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(addOrganization.pending, (state, action) => {
                state.progress = true;
            })
    }
})

export const { resetStatus, resetCurrent } = orgSlice.actions;

export const selectCurrent = (state) => state.org.current;
export const selectStatus = (state) => state.org.status;
export const selectAll = (state) => state.org.data;
export const selectProgress = (state) => state.org.progress;

export default orgSlice.reducer;