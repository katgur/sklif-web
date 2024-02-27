import { useEffect, useState } from 'react';
import api from '../api/mock/userApi';
import { addError } from '../feature/notification/notificationSlice';
import useApiDispatch from "./useApiDispatch.js";

function useUser(email) {
  const [user, setUser] = useState(null);
  const dispatch = useApiDispatch();

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
          dispatch(addError(`Не удалось получить данные пользователя${error.message ? `: ${error.message}` : ""}`))
        })
    }
  }, [user])

  return user
}

export default useUser;