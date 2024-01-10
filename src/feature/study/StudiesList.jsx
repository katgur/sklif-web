import { Link, useNavigate } from 'react-router-dom';
import SortableTableViewer from '../../component/ui/SortableTableViewer';
import useStudies from './useStudies';
import { studiesPlusIcon as plusIcon } from '../../res/svg';

const schema = [
    "patientId", "patientName", "birthDate", "studyDate", "modality",
]

const columns = [
    "Идентификатор пациента", "Имя пациента", "Дата рождения пациента", "Дата исследования", "Модальность"
]

const contextMenu = [
    (id) => <Link to={`/home/viewer/${id}`}>Просмотреть</Link>,
    (id) => <Link to={`/home/link/${id}`}>Поделиться</Link>
]

function StudiesList() {
    const navigate = useNavigate();
    const studies = useStudies();

    var onPlusButtonClick = () => {
        navigate('/home/upload');
    }

    var onStudyClick = (id) => {
        navigate('/home/study/' + id)
    }

    return (
        <>
            <div className="card toolbar-wrapper">
                <SearchBar path='studies' />
                <div className="tools">
                    <div className="right">
                        <div className="buttons">
                            <span onClick={onPlusButtonClick} className="filled-badge">
                                {plusIcon}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {
                studies &&
                <SortableTableViewer
                    columns={columns}
                    contextMenu={contextMenu}
                    onItemClick={onStudyClick}
                    capacity={10}
                    items={
                        studies.map((study) => {
                            return {
                                id: study.key,
                                data: schema.map((s) => study[s]),
                            }
                        })} />
            }
        </>)
}

export default StudiesList;