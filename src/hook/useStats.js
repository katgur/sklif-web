import { useEffect, useState } from "react";
import api from "../api/mock/statsApi";
import { useDispatch } from "react-redux";

function useStats(key) {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    useEffect(() => {
        api.getStats(key)
            .then(data => {
                setData(data);
            })
            .catch(error => {
                dispatch(addError(`Не удалось получить данные статистики: ${error.message}`));
            })
    }, [])

    return data;
}

export default useStats;