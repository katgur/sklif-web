import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postUser, getUsers, deleteUser, postAvatar } from '../../api/mock/userApi'
import { getUser } from '../../api/mock/userApi';
import { changeEmail, changePassword, changeUserInfo, changeUserRole } from '../../api/mock/userApi';
import { middleware } from '../middleware';
import { mapChangeUserRole, mapUserForClient, mapUserForServer, mapUsersForClient } from '../../util/mapper';

export const addUser = createAsyncThunk('users/addUser', async (params, thunk) => {
  return await postUser(params);
})

export const fetchUsers = createAsyncThunk('users/getUsers', async (params, thunk) => {
  console.log(params);
  return await getUsers(params);
})

export const fetchUser = createAsyncThunk('users/fetch', async (params, thunk) => {
  return await getUser(params);
})

export const setPassword = createAsyncThunk('user/password', async (params, thunk) => {
  return await changePassword();
})

export const updateUserInfo = createAsyncThunk('user/update', async (params, thunk) => {
  return await changeUserInfo(params)
})

export const updateUserRole = createAsyncThunk('user/update_role', async (params, thunk) => {
  return await changeUserRole(params);
})

export const updateUserEmail = createAsyncThunk('user/edit_email', async (params, thunk) => {
  return await changeEmail(params);
})

export const removeUser = createAsyncThunk('user/delete', async (params, thunk) => {
  return await deleteUser(params);
})

export const uploadAvatar = createAsyncThunk('user/avatar', async (params, thunk) => {
  return await postAvatar();
})

export const fetchAuthUser = createAsyncThunk('user/auth', async (params, thunk) => {
  return await getUser(params);
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [
      {
        "email": "lrezunic@gmail.com",
        "firstName": "Людмила",
        "lastName": "Резуник",
        "patronymic": "Александровна",
        "phoneNumber": "+79129329178",
        "role": "DOCTOR",
        "organization": "HSE"
      }
    ],
    current: undefined,
    auth: undefined,
    status: {
      message: undefined,
      code: undefined,
    },
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
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = {
          message: "Пользователь добавлен",
          code: 3,
        }
        state.list = [...state.list, action.payload];
        state.progress = false;
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.progress = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = {
          message: `Не удалось добавить пользователя${action.payload.message}`,
          code: action.payload.code,
        }
        state.progress = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log(action)
        state.list = action.payload;
        state.progress = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log(action)
        state.status = {
          message: `Не удалось получить список пользователей${action.payload.message}`,
          code: action.payload.code,
        }
        state.progress = false;
      })
      .addCase(setPassword.fulfilled, (state, action) => {
        state.status = {
          message: "Пароль изменен",
          code: 3
        }
        state.progress = false;
      })
      .addCase(setPassword.rejected, (state, action) => {
        state.status = {
          message: `Не удалось установить новый пароль${action.payload.message}`,
          code: action.error.message,
        }
        state.progress = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.current = action.payload;
        state.progress = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = {
          message: `Не удалось получить данные пользователя${action.payload.message}`,
          code: action.payload.code,
        }
        state.progress = false;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.status = {
          message: "Данные профиля изменены",
          code: 3
        }
        state.progress = false;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.status = {
          message: `Не удалось изменить данные пользователя${action.payload.message}`,
          code: action.payload.code,
        }
        state.progress = false;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.status = {
          message: "Права доступа пользователя изменены",
          code: 3
        }
        state.progress = false;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.status = {
          message: `Не удалось изменить права доступа пользователя${action.payload.message}`,
          code: action.payload.code,
        }
        state.progress = false;
      })
      .addCase(updateUserEmail.fulfilled, (state, action) => {
        state.status = {
          message: "Профиль привязан к новой почте",
          code: 3
        }
        state.progress = false;
      })
      .addCase(updateUserEmail.rejected, (state, action) => {
        state.status = {
          message: `Не удалось привязать профиль к новой почте${action.payload.message}`,
          code: action.payload.code,
        }
        state.progress = false;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.status = {
          message: "Пользователь удален",
          code: 3
        }
        state.progress = false;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.status = {
          message: `Не удалось удалить пользователя${action.payload.message}`,
          code: action.payload.code,
        }
        state.progress = false;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.status = {
          message: "Фотография профиля загружена",
          code: 3
        }
        state.progress = false;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.status = {
          message: `Не удалось загрузить фотографию профиля${action.payload.message}`,
          code: action.payload.code,
        }
        state.progress = false;
      })
      .addCase(addUser.pending, (state, action) => {
        state.progress = true;
      })
      .addCase(uploadAvatar.pending, (state, action) => {
        state.progress = true;
      })
      .addCase(fetchUsers.pending, (state, action) => {
        state.progress = true;
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.progress = true;
      })
      .addCase(updateUserEmail.pending, (state, action) => {
        state.progress = true;
      })
      .addCase(updateUserInfo.pending, (state, action) => {
        state.progress = true;
      })
      .addCase(updateUserRole.pending, (state, action) => {
        state.progress = true;
      })
      .addCase(removeUser.pending, (state, action) => {
        state.progress = true;
      })
  },
})
export const { resetStatus, resetCurrent } = usersSlice.actions;

export const selectAll = (state) => state.users.list;
export const selectCurrent = (state) => state.users.current;
export const selectStatus = (state) => state.users.status;
export const selectProgress = (state) => state.users.progress;
export const selectAuth = (state) => state.users.auth;

export default usersSlice.reducer;