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
    api.getUsers("" )
      .then(users => {
        dispatch(setUsers(users));
      })
      .catch(error => {
        dispatch(addError(`Не удалось получить список пользователей${error.response ? `: ${error.response.data.error}` : ""}`))
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
        return api.getUser(email);
      })
      .then((newUser) => {
        console.log(newUser)

        dispatch(editUser(newUser));
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
        dispatch(editUser(newUser))
      })
      .catch((error) => {
        dispatch(addError(`Не удалось изменить почтовый адрес пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
      })
  }
}

export const deleteUser = (email) => {
  return dispatch => {
    api.deleteUser(email, newEmail)
      .then(() => {
        dispatch(removeUser(email));
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
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return state ? [...state, action.payload] : [action.payload]
    },
    editUser: (state, action) => {
      return state ? state.filter(item => item.email !== action.payload.email).concat(action.payload) : [action.payload]
    },
    setUsers: (state, action) => {
      return action.payload
    },
    removeUser: (state, action) => {
      return state ? state.filter(item => item.email !== action.payload) : []
    }
  },
})

const { addUser, editUser, setUsers, removeUser } = usersSlice.actions;

export const selectAll = (state) => state.users;

export default usersSlice.reducer;