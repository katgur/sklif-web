import { useDispatch, useSelector } from "react-redux";
import { fecthMask, selectMaskRequested, selectResult } from "./maskSlice";

function MaskedImage({ path }) {
    var result = useSelector(selectResult);
    var maskRequested = useSelector(selectMaskRequested);
    const dispatch = useDispatch();

    var onRequestMaskClick = () => {
        dispatch(fecthMask(path));
    }

    console.log(result)
    return (
        <div className="masked-image">
            {!result.url &&
                <div className="outline-button centered-button" onClick={onRequestMaskClick}>
                    {!maskRequested ? 'Отправить запрос на обработку снимка' : 'Проверить статус обработки'}
                </div>
            }
            {result.url &&
                <img src={result.url} style={{ objectFit: "contain", height: "85vh" }} alt="mask" />
            }
        </div>
    )
}

export default MaskedImage;