import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFiles, selectDirectories, createDirectory, createDirectoryAndLoadFiles } from './storageSlice';
import useStorage from "../../hook/useStorage";
import DragAndDrop from "../../component/ui/DragAndDrop";
import Form from '../../component/ui/Form';
import Select from '../../component/ui/Form/Select';
import Input from '../../component/ui/Form/Input';
import Checkbox from '../../component/ui/Form/Checkbox';
import Details from '../../component/ui/Details';

const isDirectory = (key) => {
    return key.slice(-1) === "/";
}

function UploadFileForm() {
    const storage = useStorage();
    const [files, setFiles] = useState();
    const dispatch = useDispatch();

    const directories = storage.map(file => file.key).filter(isDirectory);

    const onSubmit = (data) => {
        if (data.hasNewDirectory) {
            dispatch(createDirectoryAndLoadFiles(data.directory, data.newDirectory, files));
        } else {
            dispatch(uploadFiles(data.directory, files));
        }
    }

    return (files ?
        <>
            <Form onSubmit={onSubmit}>
                <Select field={{ name: "directory", text: "Директория для загрузки", required: true }} options={directories} />
                <Checkbox field={{ name: "hasNewDirectory", text: "Загрузить в новую директорию" }} />
                <Input field={{ name: "newDirectory", text: "Название новой директории", dependsOn: "hasNewDirectory" }} />
            </Form>
            <Details title="Просмотреть список файлов" items={Array.from(files).map(file => file.name)} />
        </>
        :
        <DragAndDrop setFiles={setFiles} accepts=".dcm, .dicom" />
    )
}

export default UploadFileForm;