import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFiles, selectDirectories, createDirectory } from './storageSlice';
import { useForm } from "react-hook-form";
import useStorage from "../../hook/useStorage";
import DragAndDrop from "../../component/ui/DragAndDrop";
import Card from '../../component/ui/Card';

const chevronDownIcon = (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0.410093 0.910826C0.73553 0.585389 1.26317 0.585389 1.58861 0.910826L5.99935 5.32157L10.4101 0.910826C10.7355 0.585389 11.2632 0.585389 11.5886 0.910826C11.914 1.23626 11.914 1.7639 11.5886 2.08934L6.58861 7.08933C6.26317 7.41477 5.73553 7.41477 5.4101 7.08933L0.410093 2.08934C0.0846563 1.7639 0.0846563 1.23626 0.410093 0.910826Z" fill="#64748b" />
    </svg>
)



function UploadFileForm() {
    // const files = useStorage();

    const [files, setFiles] = useState(null);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [hasNewDirectory, setHasNewDirectory] = useState(false);

    const directories = useSelector(selectDirectories);

    const onSubmit = (data) => {
        if (hasNewDirectory) {
            dispatch(createDirectory({ path: data.dir + data.newDir }));
            dispatch(uploadFiles({ path: data.dir + data.newDir, files: files }));
        } else {
            dispatch(uploadFiles({ path: data.dir.slice(0, -1), files: files }));
        }
    }

    const onCheckboxChanged = () => {
        setHasNewDirectory(!hasNewDirectory);
    }

    const uploadForm = (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p className="title-font">
                    Выберите директорию для загрузки
                </p>
                <select {...register("dir")}>
                    {directories.map((option) => {
                        return (
                            <option key={option.key} value={option.key}>{option.key}</option>
                        )
                    })}
                </select>
                <div>
                    <input
                        className="checkbox"
                        onChange={onCheckboxChanged}
                        type='checkbox'
                        defaultChecked={hasNewDirectory} />
                    <span className="text-font">Загрузить в новую директорию</span>
                </div>
                {
                    hasNewDirectory &&
                    <>
                        <p className="title-font">
                            Введите название новой директории для загрузки файлов
                        </p>
                        <input {...register("newDir")} type='text' className="outline-input" disabled={!hasNewDirectory} />
                    </>
                }
            </div>

            {files &&
                <>
                    <details>
                        <summary className="outline-button">Просмотреть список файлов{chevronDownIcon}</summary>
                        <div className="file-list">
                            {files &&
                                Array.from(files).map((file) => {
                                    return (
                                        <p><span className="text-font">{file.name}</span></p>
                                    )
                                })
                            }
                        </div>
                    </details>
                </>
            }

            <div>
                <input value="Загрузить" type="submit" className="filled-button" />
            </div>
        </form>
    )

    return (
        files ? uploadForm : <DragAndDrop setFiles={setFiles} accepts=".dcm, .dicom" />
    )
}

export default UploadFileForm;