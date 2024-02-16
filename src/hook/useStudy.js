import { useEffect, useState } from "react"
import api from '../api/mock/studyApi'

function useStudy(key) {
    const [study, setStudy] = useState(null);

    const dispatch =
        useEffect(() => {
            api.getById(key)
                .then(study => setStudy(study))
                .catch(error => dispatch(addError(`Не удалось получить список исследований${error.response ? `: ${error.response.data.error}` : ""}`)))
        }, [])

    return study
}

export default useStudy