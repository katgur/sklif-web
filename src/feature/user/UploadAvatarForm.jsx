import { useState } from "react";
import useApiDispatch from "../../hook/useApiDispatch.js";
import { uploadAvatar } from "./usersSlice";
import useUser from '../../hook/useUser';
import useAuth from '../../hook/useAuth';
import { useParams } from "react-router";
import { FileUploadForm, Preview, Button, Card, Stack } from "tailwind-admin";

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
        <Card width="full">
            <FileUploadForm file={file} setFile={setFile}>
                {
                    file &&
                    <>
                        <Preview fileURL={file.url} />
                        <Stack direction="horizontal">
                            <Button width="full" style="primary" onClick={onUploadButtonClick}>
                                Загрузить
                            </Button>
                            <Button width="full" style="secondary" onClick={() => setFile(null)}>
                                Отмена
                            </Button>
                        </Stack>
                    </>
                }
            </FileUploadForm>
        </Card>
    )
}

export default UploadAvatarForm;