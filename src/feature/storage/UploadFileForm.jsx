import { useState } from "react";
import { uploadFiles, createDirectoryAndLoadFiles } from './storageSlice';
import useStorage from "../../hook/useStorage";
import { DragAndDrop, Form, Select, Input, Checkbox, Details, Card } from "tailwind-admin";
import useApiDispatch from "../../hook/useApiDispatch";
import { useNavigate } from "react-router";

const isDirectory = (key) => {
    return key.slice(-1) === "/";
}

function UploadFileForm() {
    const storage = useStorage();
    const [files, setFiles] = useState();
    const dispatch = useApiDispatch();
    const navigate = useNavigate();

    const directories = storage.map(file => file.key).filter(isDirectory);

    const onSubmit = async (data) => {
        const isSuccess = data.hasNewDirectory ?
            await dispatch(createDirectoryAndLoadFiles(data.directory, data.newDirectory, files)) :
            await dispatch(uploadFiles(data.directory, files));
        if (isSuccess) {
            navigate("/home/success/file");
        }
    }

    return (files ?
        <>
            <Card width="full">
                <Form onSubmit={onSubmit}>
                    <Select field={{ name: "directory", text: "Директория для загрузки", required: true }} options={directories} />
                    <Checkbox field={{ name: "hasNewDirectory", text: "Загрузить в новую директорию" }} />
                    <Input field={{ name: "newDirectory", text: "Название новой директории", dependsOn: "hasNewDirectory" }} />
                </Form>
            </Card>
            <Details title="Просмотреть список файлов" items={Array.from(files).map(file => file.name)} />
        </>
        :
        <Card width="fit">
            <DragAndDrop setFiles={setFiles} accepts=".dcm, .dicom" />
        </Card>
    )
}

export default UploadFileForm;