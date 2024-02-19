import { useRef } from "react";
import Viewport from "./Viewport";
import DataViewer from "../../component/ui/DataViewer";
import api from "../../api/mock/storageApi";
import useStudy from '../../hook/useStudy';
import Card from '../../component/ui/Card';
import Link from '../../component/ui/Link';
import { Link as RouteLink } from 'react-router-dom';
import Stack from "../../component/ui/Stack";

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
    const study = useStudy(window.location.href.split('study/')[1]);
    const viewport = useRef();

    if (!study) {
        return;
    }

    return (
        <Card padding="m">
            <Stack gap="m">
                <Stack direction="vertical" gap="m">
                    <Viewport viewport={viewport}
                        imageId={'wadouri:' + api.getBytes(study.keys[0])}
                        style={{ width: "200px", height: "200px" }} />
                    <Link style="primary">
                        <RouteLink to={`/home/viewer/${study.key}`}>
                            Просмотр
                        </RouteLink>
                    </Link>
                </Stack>
                <DataViewer
                    path='studies'
                    name=""
                    entity={study}
                    schema={schema} />
            </Stack>
        </Card>
    )
}

export default StudyViewer;