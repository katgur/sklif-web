import style from './style.module.css'
import { useRef, useEffect } from 'react';

function FileUploadForm({ file, setFile, children }) {
    const readerRef = useRef(new FileReader());
    const inputRef = useRef();

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

    useEffect(() => {
        if (!file) {
            const input = inputRef.current;
            input.files = new DataTransfer().files;
        }
    }, [file])

    const onFileUploaded = (e) => {
        const file = e.target.files[0];
        console.log(file)
        setFile({ name: file.name });
        readerRef.current.readAsDataURL(file);
    }

    return (
        <div className={style.wrapper}>
            <div className={style.chooser}>
                <label className={style.button} htmlFor="upload-avatar">
                    Выберите файл
                    <input ref={inputRef} onChange={onFileUploaded} id="upload-avatar" type="file" accept=".png,.jpg,.jpeg" />
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