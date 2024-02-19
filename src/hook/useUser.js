import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../api/mock/userApi';
import { addError } from '../feature/notification/notificationSlice';

function useUser(email) {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!email) {
      return;
    }
    
    if (!user) {
      api.getUser(email)
        .then(user => {
          setUser(user);
        })
        .catch(error => {
          dispatch(addError(`Не удалось получить данные пользователя${error.response ? `: ${error.response.data.error}` : ""}`))
        })
    }
  }, [user])

  return user
}

export default useUser;