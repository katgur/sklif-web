import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/userApi';

export const createUser = user => {
  return {
    api: async () => await api.postUser(user),
    action: addUser,
    message: {
      success: "Пользователь добавлен",
      error: "Не удалось добавить пользователя",
    },
  }
}

export const updateUserRole = (email, newRole) => {
  return {
    api: async () => {
      await api.changeUserRole(email, newRole);
      const newUser = api.getUser(email);
      return newUser;
    },
    action: editUser,
    message: {
      success: "Права доступа пользователя изменены",
      error: "Не удалось изменить права доступа пользователя",
    },
  }
}

export const fetchUsers = () => {
  return {
    api: async () => await api.getUsers(""),
    action: setUsers,
    message: {
      error: "Не удалось получить список пользователей",
    },
  }
}

export const setPassword = (email, newPassword) => {
  return {
    api: async () => await api.changePassword(email, newPassword),
    message: {
      success: "Пароль изменен",
      error: "е удалось получить данные пользователя",
    }
  }
}

export const updateUserInfo = (email, userInfo) => {
  return {
    api: async () => {
      await api.changeUserInfo(email, userInfo);
      const newUser = await api.getUser(email);
      return newUser;
    },
    action: editUser,
    message: {
      success: "Данные пользователя изменены",
      error: "Не удалось изменить данные пользователя",
    }
  }
}

export const updateUserEmail = (email, newEmail) => {
  return {
    api: async () => {
      await api.changeEmail(email, newEmail);
      const newUser = api.getUser(newEmail);
      return newUser;
    },
    action: editUser,
    message: {
      success: "Почтовый адрес пользователя изменен",
      error: "Не удалось изменить почтовый адрес пользователя",
    },
  }
}

export const deleteUser = email => {
  return {
    api: async () => await api.deleteUser(email),
    action: removeUser,
    message: {
      success: "Данные пользователя удалены",
      error: "Не удалось удалить данные пользователя",
    }
  }
}

export const uploadAvatar = (email, file) => {
  return {
    api: async () => {
      await api.postAvatar(email, file);
      const newUser = api.getUser(email);
      return newUser;
    },
    action: editUser,
    message: {
      success: "Фотография профиля пользователя загружен",
      error: "Не удалось загрузить фотографию профиля пользователя",
    },
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
      return state ? state.filter(item => item.email !== action.payload.email).concat(action.payload.newUser) : [action.payload.newUser]
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