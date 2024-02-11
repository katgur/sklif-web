import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { uploadAvatar } from "./usersSlice";
import useUser from '../../hook/useUser';
import { useParams } from "react-router";

function UploadAvatarForm() {
    const inputField = useRef();
    const preview = useRef();
    const [file, setFile] = useState();
    const reader = useMemo(() => new FileReader(), []);
    const dispatch = useDispatch();
    const { email } = useParams();
    const user = useUser(email);

    useEffect(() => {
        var onLoad = (e) => {
            preview.current.src = reader.result;
        }

        reader.addEventListener("load", onLoad, false);

        return () => {
            reader.removeEventListener("load", onLoad);
        }
    }, [reader])

    var onFileUploaded = () => {
        var file = inputField.current.files[0];
        setFile(file);
        reader.readAsDataURL(file);
    }

    var onUploadButtonClick = () => {
        dispatch(uploadAvatar(user.email, reader.result));
    }

    return (
        <div className="upload-avatar-form">
            <div className="file-chooser">
                <label className="choose-file-button">
                    Выберите файл
                    <input ref={inputField} id="avatar-upload" onChange={onFileUploaded} type="file" accept=".png,.jpg,.jpeg" />
                </label>
                <span className="text-font">
                    {file ? file.name : "Файл не выбран"}
                </span>
                {
                    file &&
                    <img width="200" ref={preview} alt="preview" />
                }
            </div>
            {
                file &&
                <div onClick={onUploadButtonClick} className="filled-button">
                    Загрузить
                </div>
            }
        </div>
    )
}

export default UploadAvatarForm;