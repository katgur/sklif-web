import { useSelector } from "react-redux";
import ProgressBar from "../../component/ui/ProgressBar";
import { selectIsProgress } from "./progressSlice";

function Progress() {
    const isProgress = useSelector(selectIsProgress);
    
    return (
        <ProgressBar isProgress={isProgress} />
    )
}

export default Progress;