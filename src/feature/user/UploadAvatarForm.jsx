import { useState } from "react";
import useApiDispatch from "../../hook/useApiDispatch.js";
import { uploadAvatar } from "./usersSlice";
import useUser from '../../hook/useUser';
import useAuth from '../../hook/useAuth';
import { useParams } from "react-router";
import { FileUploadForm, Preview, Button, Card } from "tailwind-admin";

function UploadAvatarForm() {
    const { email } = useParams();
    const auth = useAuth();
    const user = useUser(email || auth.email);
    const [file, setFile] = useState(null);
    const dispatch = useApiDispatch();

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