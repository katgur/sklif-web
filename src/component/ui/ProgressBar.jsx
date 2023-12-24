import { useSelector } from 'react-redux';
import { selectProgress as userSelectProgress } from '../../feature/user/usersSlice';
import { selectProgress as orgSelectProgress } from '../../feature/org/orgSlice';
import { selectProgress as storageSelectProgress } from '../../feature/storage/storageSlice';
import { selectProgress as studySelectProgress } from '../../feature/study/studiesSlice';

function ProgressBar() {
    const userProgress = useSelector(userSelectProgress);
    const orgProgress = useSelector(orgSelectProgress);
    const storageProgress = useSelector(storageSelectProgress);
    const studyProgress = useSelector(studySelectProgress);

    return (
        <div className="progress-track">
            {(userProgress || orgProgress || storageProgress || studyProgress) && <div className="progress-value"></div>}
        </div>
    )
}

export default ProgressBar;