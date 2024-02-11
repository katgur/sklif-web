import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postUser, getUsers, deleteUser, postAvatar } from '../../api/mock/userApi'
import { getUser } from '../../api/mock/userApi';
import { changeEmail, changePassword, changeUserInfo, changeUserRole } from '../../api/mock/userApi';
import { addSuccess } from '../notification/notificationSlice';

export const addUser = user => {
  return dispatch => {
    postUser(user)
      .then(newUser => {
        dispatch(addNewUser(newUser));
        dispatch(addSuccess(`Пользователь ${user.firstName} ${user.lastName} добавлен`))
      })
      .catch((error) => {
        dispatch(setError("Не удалось добавить пользователя" + (error.response ? `: ${error.response.data.error}` : "")))
      })
  }
}

export const updateUserRole = user => {
  return dispatch => {
    changeUserRole(user)
      .then(newUser => {
        dispatch(editUser(newUser));
        dispatch(addSuccess(`У пользователя ${user.firstName} ${user.lastName} изменены права доступа на ${newUser.role}`));
      })
      .catch((error) => {
        dispatch(setError("Не удалось редактировать права доступа пользователя" + (error.response ? `: ${error.response.data.error}` : "")))
      })
  }
}

export const fetchUsers = createAsyncThunk('users/getUsers', async (params, thunk) => {
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
  },
  reducers: {
    addNewUser: (state, action) => {
      return {
        ...state,
        list: [...state.list, action.payload],
      }
    },
    editUser: (state, action) => {
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload.id).concat(action.payload),
      }
    },
    resetCurrent: (state, action) => {
      state.current = undefined;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.auth = action.payload;
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
  },
})
export const { resetStatus, resetCurrent, addNewUser, editUser } = usersSlice.actions;

export const selectAll = (state) => state.users.list;
export const selectCurrent = (state) => state.users.current;
export const selectStatus = (state) => state.users.status;
export const selectProgress = (state) => state.users.progress;
export const selectAuth = (state) => state.users.auth;

export default usersSlice.reducer;