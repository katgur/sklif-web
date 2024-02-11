import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postUser, getUsers, deleteUser, postAvatar } from '../../api/mock/userApi'
import { getUser } from '../../api/mock/userApi';
import { changeEmail, changePassword, changeUserInfo, changeUserRole } from '../../api/mock/userApi';
import { addError, addSuccess } from '../notification/notificationSlice';
import { mapUserForServer } from '../../util/mapper'

export const addUser = user => {
  return dispatch => {
    postUser(user)
      .then(newUser => {
        dispatch(addNewUser(newUser));
        dispatch(addSuccess(`Пользователь ${user.firstName} ${user.lastName} добавлен`))
      })
      .catch((error) => {
        dispatch(addError(`Не удалось добавить пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
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
        dispatch(addError(`Не удалось редактировать права доступа пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
      })
  }
}

export const fetchUsers = () => {
  return dispatch => {
    getUsers({ filter: "" })
      .then(users => {
        dispatch(setUsers(users));
      })
      .catch(error => {
        dispatch(addError(`Не удалось получить список пользователей${error.response ? `: ${error.response.data.error}` : ""}`))
      })
  }
}

export const fetchUser = email => {
  return dispatch => {
    getUser(email)
      .then(user => {
        dispatch(setUser(user));
      })
      .catch(error => {
        dispatch(addError(`Не удалось получить данные пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
      })
  }
}

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
    list: [],
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
    setUsers: (state, action) => {
      return {
        ...state,
        list: action.payload,
      }
    },
    setUser: (state, action) => {
      return {
        ...state,
        current: action.payload,
      }
    },
    resetCurrent: (state, action) => {
      state.current = undefined;
    }
  },
})
export const { resetStatus, resetCurrent, addNewUser, editUser, setUsers, setUser } = usersSlice.actions;

export const selectAll = (state) => state.users.list;
export const selectCurrent = (state) => state.users.current;
export const selectStatus = (state) => state.users.status;
export const selectProgress = (state) => state.users.progress;
export const selectAuth = (state) => state.users.auth;

export default usersSlice.reducer;