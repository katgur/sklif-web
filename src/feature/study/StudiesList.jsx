import { Link, useNavigate } from 'react-router-dom';
import SortableTableViewer from '../../component/ui/SortableTableViewer';
import useStudies from '../../hook/useStudies';
import StorageToolPanel from '../../component/ui/StorageToolPanel';

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

    if (!studies) {
        return;
    }

    const onStudyClick = (id) => {
        navigate('/home/study/' + id)
    }

    return (
        <>
            <StorageToolPanel>
                <Link to='/home/upload'>Загрузить исследование</Link>
            </StorageToolPanel>
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
        </>
    )
}

export default StudiesList;