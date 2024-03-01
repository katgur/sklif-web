import { useSelector } from "react-redux";
import { ProgressBar } from "tailwind-admin";
import { selectIsProgress } from "./progressSlice";

function Progress() {
    const isProgress = useSelector(selectIsProgress);

    return (
        <ProgressBar isProgress={isProgress} />
    )
}

export default Progress;