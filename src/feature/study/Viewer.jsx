import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import StackViewport from './StackViewport';
import Toolbar from './Toolbar';
import { fetchInfo, fetchStudy, selectCurrent, selectInfo } from './studiesSlice';
import SideDataViewer from '../../component/ui/SideDataViewer';
import { useState } from 'react';
import CommentSection from './CommentSection';
import MaskedImage from './MaskedImage';
import { addComment } from './studiesSlice';
import { isDirectory } from '../../util/storageUtil';
import { getBytes } from '../../api/storageApi';

const schema = [
    {
        text: "Исследование",
        tabs: [
            { name: "studyId", text: "Идентификатор" },
            { name: "studyDescription", text: "Описание" },
            { name: "studyDate", text: "Дата" },
            { name: "studyTime", text: "Время" },
            { name: "seriesDescription", text: "Описание серии" },
            { name: "seriesDate", text: "Дата серии" },
            { name: "seriesTime", text: "Время серии" },
            { name: "modality", text: "Модальность", style: "filled-badge" }
        ]
    },
    {
        text: "Оборудование",
        tabs: [
            { name: "manufacturer", text: "Производитель" },
            { name: "institutionName", text: "Название" },
            { name: "institutionAddress", text: "Адрес" },
            { name: "stationName", text: "Станция" },
            { name: "operatorName", text: "Имя оператора" },
        ]
    },
    {
        text: "Врач",
        tabs: [
            { name: "performingPhysician", text: "" },
            { name: "physicianName", text: "Имя" },
            { name: "physicianAddress", text: "Адрес" },
            { name: "physicianPhoneNumber", text: "Телефон" },
            { name: "departmentName", text: "Учреждение" },
        ]
    },
    {
        text: "Пациент",
        tabs: [
            { name: "patientId", text: "Идентификатор пациента" },
            { name: "patientName", text: "Имя" },
            { name: "birthDate", text: "Дата рождения" },
            { name: "patientAge", text: "Возраст" },
            { name: "patientSize", text: "Рост" },
            { name: "patientWeight", text: "Вес" },
            { name: "patientAddress", text: "Адрес" },
            { name: "country", text: "Страна" },
            { name: "region", text: "Регион" },
            { name: "patientComments", text: "Комментарии" },
        ]
    },
];

function Viewer() {
    const viewport = useRef();
    const dispatch = useDispatch();
    const study = useSelector(selectCurrent);
    const info = useSelector(selectInfo);
    const [maskState, setMaskState] = useState({ enabled: false })
    const [drawerState, setDrawerState] = useState({ enabled: false });
    const [index, setIndex] = useState(0);

    var key = window.location.href.split('viewer/')[1];

    console.log(study)
    useEffect(() => {
        if (!study) {
            dispatch(fetchStudy({ key: key }));
        }
        if (study && !info) {
            dispatch(fetchInfo({ key: study.keys[0] }));
        }
    }, [dispatch, study, info, key, maskState, drawerState])

    var onBurgerClick = () => {
        setDrawerState({ enabled: !drawerState.enabled })
    }

    var onSave = (comment) => {
        dispatch(addComment({ key: study.keys[index], comment: comment }))
    }

    var commentSection = {
        text: "Комментарии",
        tabs: [
            { name: "commentsGeneral", text: "", object: (comments) => <CommentSection comments={study.commentsGeneral} onSave={onSave} /> },
        ]
    }

    var onMaskClick = () => {
        setMaskState({ enabled: !maskState.enabled });
    }

    return (info && isDirectory(key) &&
        <div className="viewer">
            <div className="viewport-with-tools">
                <Toolbar viewport={viewport} onBurgerClick={onBurgerClick} onMaskClick={onMaskClick} maskState={maskState} />
                <div className="viewports">
                    <StackViewport viewport={viewport} index={index} setIndex={setIndex} imageIds={study.keys.map(key => {
                        return getBytes(key)
                    })} />
                    {maskState.enabled && <MaskedImage path={study.keys[index]} />}
                    {drawerState.enabled &&
                        <SideDataViewer schema={[...schema, commentSection]} entity={info} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Viewer;