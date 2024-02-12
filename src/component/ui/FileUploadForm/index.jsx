import './FileUploadForm.css';
import { useRef, useEffect } from 'react';

function FileUploadForm({ file, setFile, children }) {
    const inputField = useRef();
    const readerRef = useRef(new FileReader());

    useEffect(() => {
        const reader = readerRef.current;

        const onLoad = (e) => {
            setFile({
                ...file,
                url: e.target.result
            });
        }

        reader.addEventListener("load", onLoad, false);
        return () => {
            reader.removeEventListener("load", onLoad);
        }
    }, [file])

    const onFileUploaded = () => {
        const file = inputField.current.files[0];
        setFile({ name: file.name });
        readerRef.current.readAsDataURL(file);
    }

    return (
        <div className='file-upload-form'>
            <div className="file-upload-form__chooser">
                <label className="file-upload-form__button">
                    Выберите файл
                    <input ref={inputField} id="avatar-upload" onChange={onFileUploaded} type="file" accept=".png,.jpg,.jpeg" />
                </label>
                <span>
                    {file ? file.name : "Файл не выбран"}
                </span>
            </div>
            {children}
        </div>
    )
}

export default FileUploadForm