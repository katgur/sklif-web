import { useDispatch, useSelector } from "react-redux";
import { selectCurrent, fetchStudy } from "./studiesSlice";
import { useEffect, useRef } from "react";
import Viewport from "./Viewport";
import DataViewer from "../../component/ui/DataViewer";
import { useNavigate } from 'react-router-dom';
import { getBytes } from "../../api/mock/storageApi";

const schema = [
    {
        text: "Исследование",
        tabs: [
            { name: "studyId", text: "Идентификатор" },
            { name: "studyDescription", text: "Описание" },
            { name: "studyDate", text: "Дата" },
            { name: "studyTime", text: "Время" },
        ]
    },
    {
        text: "Серия",
        tabs: [
            { name: "seriesDescription", text: "Описание" },
            { name: "modality", text: "Модальность" },
        ]
    },
    {
        text: "Пациент",
        tabs: [
            { name: "patientId", text: "Идентификатор" },
            { name: "patientName", text: "Имя" },
            { name: "birthDate", text: "Дата рождения" },
            { name: "patientAge", text: "Возраст" },
            { name: "patientWeight", text: "Вес" },
            { name: "patientAddress", text: "Адрес" },
            { name: "country", text: "Страна" },
            { name: "region", text: "Регион" },
            { name: "telephone", text: "Телефон" },
            { name: "occupation", text: "Занятость" },
            { name: "patientComments", text: "Комментарии" },
        ]
    },
    {
        text: "Врач",
        tabs: [
            { name: "physicianName", text: "Имя лечащего врача" },
            { name: "physicianAddress", text: "Адрес" },
            { name: "physicianPhoneNumbers", text: "Телефон" },
            { name: "departmentName", text: "Организация" },
            { name: "performingPhysician", text: "Имя врача" },
            { name: "operatorName", text: "Имя оператора" },
        ]
    },
    {
        text: "Комментарии",
        tabs: [
            { name: "reviewDate", text: "Дата" },
            { name: "reviewTime", text: "Время" },
            { name: "reviewerName", text: "Имя врача" },
            { name: "textComments", text: "" },
            { name: "commentsGeneral", text: "" },
        ]
    }
];

function StudyViewer() {
    const study = useSelector(selectCurrent);
    const dispatch = useDispatch();
    const viewport = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        var key = window.location.href.split('study/')[1];
        if (!study) {
            dispatch(fetchStudy({ key: key }));
        }
    }, [dispatch, study])

    var onViewButtonClick = () => {
        navigate(`/home/viewer/${study.key}`)
    }

    return (
        study &&
        <div className="content__home-page-profile card">
            <div>
                <Viewport viewport={viewport}
                    imageId={'wadouri:' + getBytes(study.keys[0])}
                    style={{ width: "200px", height: "200px", marginBottom: "20px" }} />
                <div onClick={onViewButtonClick} className="filled-button">Просмотр</div>
            </div>
            {
                <DataViewer
                    path='studies'
                    name=""
                    entity={study}
                    schema={schema} />
            }
        </div>
    )
}

export default StudyViewer;