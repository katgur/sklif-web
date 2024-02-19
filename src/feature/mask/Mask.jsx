import { useDispatch, useSelector } from "react-redux";
import { fetchMask, selectResult } from "./maskSlice";
import MaskedImage from "../../component/ui/MaskedImage";
import { useEffect } from "react";

function Mask({ path }) {
    const result = useSelector(selectResult);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMask(path));
    }, [path])

    return (
        <MaskedImage url={result.url} />
    )
}

export default Mask;