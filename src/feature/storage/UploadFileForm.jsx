import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFiles, selectDirectories, createDirectory } from './storageSlice';
import { useForm } from "react-hook-form";
import useStorage from "../../hook/useStorage";

const chevronDownIcon = (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0.410093 0.910826C0.73553 0.585389 1.26317 0.585389 1.58861 0.910826L5.99935 5.32157L10.4101 0.910826C10.7355 0.585389 11.2632 0.585389 11.5886 0.910826C11.914 1.23626 11.914 1.7639 11.5886 2.08934L6.58861 7.08933C6.26317 7.41477 5.73553 7.41477 5.4101 7.08933L0.410093 2.08934C0.0846563 1.7639 0.0846563 1.23626 0.410093 0.910826Z" fill="#64748b" />
    </svg>
)

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function UploadFileForm() {
    useStorage();

    const inputField = useRef();
    const dropArea = useRef();
    const [files, setFiles] = useState();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const status = useSelector(selectStatus);

    const [hasNewDirectory, setHasNewDirectory] = useState(false);

    const onFileUploaded = (files) => {
        setFiles(files);
    }

    var directories = useSelector(selectDirectories);

    useEffect(() => {
        function handleDrop(e) {
            onFileUploaded(e.dataTransfer.files);
        }
        function handleDragEnter(e) {
            dropArea.current.style.backgroundColor = "#3056d322"
        }
        function handleDragLeave(e) {
            dropArea.current.style.backgroundColor = "#3056d311"
        }

        if (status.code === 200) {
            setFiles(undefined);
        }

        var currentDropArea = dropArea.current;
        if (currentDropArea) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                currentDropArea.addEventListener(eventName, preventDefaults, false)
            })

            currentDropArea.addEventListener('drop', handleDrop, false)
            currentDropArea.addEventListener('dragenter', handleDragEnter, false)
            currentDropArea.addEventListener('dragleave', handleDragLeave, false)
        }

        return () => {
            if (currentDropArea) {
                ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                    currentDropArea.removeEventListener(eventName, preventDefaults, false)
                })

                currentDropArea.removeEventListener('drop', handleDrop, false)
                currentDropArea.removeEventListener('dragenter', handleDragEnter, false)
                currentDropArea.removeEventListener('dragleave', handleDragLeave, false)
            }
        }
    }, [dropArea, dispatch, status])

    var onSubmit = (data) => {
        if (hasNewDirectory) {
            dispatch(createDirectory({ path: data.dir + data.newDir }));
            dispatch(uploadFiles({ path: data.dir + data.newDir, files: files }));
        } else {
            dispatch(uploadFiles({ path: data.dir.slice(0, -1), files: files }));
        }
    }

    var onCheckboxChanged = () => {
        setHasNewDirectory(!hasNewDirectory);
    }

    var uploadForm = (
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

    var dropFileForm = (
        <>
            <p className="title-font">
                Загрузите файлы в формате <span className="accent">.dcm, .dicom</span>
            </p>
            <div>
                <label ref={dropArea} className="text-font custom-file-upload" htmlFor="file-upload">
                    Нажмите для выбора или перетащите файлы в выделенную область
                </label>
                <input id="file-upload" onChange={() => onFileUploaded(inputField.current.files)} ref={inputField} type="file" multiple />
            </div>
        </>
    )

    return (
        <>
            <div className="card upload-form">
                {
                    files ? uploadForm : dropFileForm
                }
            </div>
        </>
    )
}

export default UploadFileForm;