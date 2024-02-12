import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadAvatar } from "./usersSlice";
import useUser from '../../hook/useUser';
import { useParams } from "react-router";
import FileUploadForm from "../../component/ui/FileUploadForm";
import Preview from "../../component/ui/FileUploadForm/Preview";
import Button from '../../component/ui/Button';
import Card from '../../component/ui/Card';

function UploadAvatarForm() {
    const { email } = useParams();
    const user = useUser(email);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    console.log(file)
    if (!user) {
        return;
    }

    const onUploadButtonClick = () => {
        if (!file) {
            return;
        }
        dispatch(uploadAvatar(user.email, file.url));
    }

    return (
        <Card>
            <FileUploadForm file={file} setFile={setFile}>
                {
                    file &&
                    <>
                        <Preview fileURL={file.url} />
                        <Button style="primary" onClick={onUploadButtonClick}>
                            Загрузить
                        </Button>
                        <Button style="secondary" onClick={() => setFile(null)}>
                            Отмена
                        </Button>
                    </>
                }
            </FileUploadForm>
        </Card>
    )
}

export default UploadAvatarForm;