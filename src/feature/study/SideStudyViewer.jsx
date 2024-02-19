import SideDataViewer from '../../component/ui/SideDataViewer'
import CommentSection from './CommentSection';

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

function SideStudyViewer({ study, volume }) {
    console.log(volume)
    return (
        <SideDataViewer schema={schema} entity={study}>
            {
                volume &&
                <p>
                    Объем пораженной ткани {volume} cm3
                </p>
            }
            <CommentSection _key={study.key} comments={study.globalComments} />
        </SideDataViewer>
    )
}

export default SideStudyViewer