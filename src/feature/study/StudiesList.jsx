import { Link, useNavigate } from 'react-router-dom';
import { SortableTableViewer, ToolPanel } from 'tailwind-admin';
import useStudies from '../../hook/useStudies';
import { columns } from '../../util/columns';

const contextMenu = [
    (id) => <Link to={`/home/viewer/${id}`}>Просмотреть</Link>,
    (id) => <Link to={`/home/link/${id}`}>Поделиться</Link>
]

const mapStudiesForTable = (studies) => {
    return studies.map(study => {
        return {
            studyId: study.studyId,
            patientId: study.patientId,
            patientName: study.patientName,
            studyDescription: study.studyDescription,
            studyDate: study.studyDate,
            modality: study.modality.join(", "),
            key: study.key,
        }
    })
}

function StudiesList() {
    const navigate = useNavigate();
    const studies = useStudies();

    if (!studies || studies.length === 0) {
        return;
    }

    const onStudyClick = (id) => {
        navigate('/home/study/' + id)
    }

    const mappedStudies = mapStudiesForTable(studies);

    return (
        <>
            <ToolPanel>
                <Link to='/home/upload'>Загрузить исследование</Link>
            </ToolPanel>
            <SortableTableViewer
                columns={Object.keys(mappedStudies[0]).slice(0, -1).map(key => columns[key])}
                keys={Object.keys(mappedStudies[0]).slice(0, -1)}
                contextMenu={contextMenu}
                onItemClick={onStudyClick}
                capacity={10}
                id="key"
                items={mappedStudies} />
        </>
    )
}

export default StudiesList;