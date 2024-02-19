import { useDispatch, useSelector } from "react-redux";
import { fecthMask, selectMaskRequested, selectResult } from "./maskSlice";
import MaskedImage from "../../component/ui/MaskedImage";

function Mask({ path }) {
    var result = useSelector(selectResult);
    var maskRequested = useSelector(selectMaskRequested);
    const dispatch = useDispatch();

    var onRequestMaskClick = () => {
        dispatch(fecthMask(path));
    }

    return (
        <MaskedImage result={result} maskRequested={maskRequested} />
    )
}

export default Mask;