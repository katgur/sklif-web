import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/userApi';
import { addError, addSuccess } from '../notification/notificationSlice';

export const createUser = user => {
  return dispatch => {
    api.postUser(user)
      .then(newUser => {
        dispatch(addUser(newUser));
        dispatch(addSuccess(`Пользователь ${user.firstName} ${user.lastName} добавлен`))
      })
      .catch((error) => {
        dispatch(addError(`Не удалось добавить пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
      })
  }
}

export const updateUserRole = user => {
  return dispatch => {
    api.changeUserRole(user)
      .then(newUser => {
        dispatch(editUser(newUser));
        dispatch(addSuccess(`У пользователя ${user.firstName} ${user.lastName} изменены права доступа на ${newUser.role}`));
      })
      .catch((error) => {
        dispatch(addError(`Не удалось изменить права доступа пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
      })
  }
}

export const fetchUsers = () => {
  return dispatch => {
    api.getUsers({ filter: "" })
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
    api.getUser(email)
      .then(user => {
        dispatch(setUser(user));
      })
      .catch(error => {
        dispatch(addError(`Не удалось получить данные пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
      })
  }
}

export const setPassword = (email, newPassword) => {
  return dispatch => {
    api.changePassword(email, newPassword)
      .then(() => {
        dispatch(addSuccess("Пароль изменен"));
      })
      .catch(error => {
        dispatch(addError(`Не удалось получить данные пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
      })
  }
}

export const updateUserInfo = (email, userInfo) => {
  return dispatch => {
    api.changeUserInfo(email, userInfo)
      .then(() => {
        dispatch(addSuccess("Данные пользователя изменены"));
        return api.fetchUser(email);
      })
      .then((newUser) => {
        dispatch(addUser(newUser))
      })
      .catch((error) => {
        dispatch(addError(`Не удалось изменить данные пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
      })
  }
}

export const updateUserEmail = (email, newEmail) => {
  return dispatch => {
    api.changeUserInfo(email, newEmail)
      .then(() => {
        dispatch(addSuccess("Почтовый адрес пользователя изменен"));
        return api.fetchUser(email);
      })
      .then((newUser) => {
        dispatch(addUser(newUser))
      })
      .catch((error) => {
        dispatch(addError(`Не удалось изменить почтовый адрес пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
      })
  }
}

export const removeUser = (email) => {
  return dispatch => {
    api.deleteUser(email, newEmail)
      .then(() => {
        dispatch(addSuccess("Данные пользователя удалены"));
      })
      .catch((error) => {
        dispatch(addError(`Не удалось удалить данные пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
      })
  }
}

export const uploadAvatar = (file) => {
  return dispatch => {
    api.postAvatar(file)
      .then(() => {
        dispatch(addSuccess("Фотография профиля пользователя загружен"));
      })
      .catch((error) => {
        dispatch(addError(`Не удалось загрузить фотографию профиля пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
      })
  }
}

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    current: null,
  },
  reducers: {
    addUser: (state, action) => {
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
      return {
        ...state,
        current: nullF
      }
    }
  },
})
export const { resetStatus, resetCurrent, addUser, editUser, setUsers, setUser } = usersSlice.actions;

export const selectAll = (state) => state.users.list;
export const selectCurrent = (state) => state.users.current;

export default usersSlice.reducer;