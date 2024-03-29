import { useEffect, useState } from "react"
import api from '../api/mock/studyApi'
import { addError } from '../feature/notification/notificationSlice'

function useStudy(key) {
    const [study, setStudy] = useState(null);

    const dispatch =
        useEffect(() => {
            api.getById(key)
                .then(study => setStudy(study))
                .catch(error => dispatch(addError(`Не удалось получить список исследований${error.message ? `: ${error.message}` : ""}`)))
        }, [])

    return study
}

export default useStudy