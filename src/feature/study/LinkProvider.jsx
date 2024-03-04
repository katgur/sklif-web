import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Modal, Alert, Button, Card, Article, Stack } from 'tailwind-admin';
import { clientUrl, protocol } from '../../util/config';

function LinkProvider() {
    const navigate = useNavigate();
    const key = window.location.href.split('link/')[1];
    const [copyStatus, setCopyStatus] = useState();

    const onCancelButtonClick = () => {
        navigate(-1);
    }

    const link = `${protocol}://${clientUrl}/home/viewer/${key}`;

    const copyContent = (text, setCopyStatus) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopyStatus({ type: 'success', text: 'Ссылка скопирована в буфер обмена' });
            })
            .catch(() => {
                setCopyStatus({ type: "error", text: 'Не удалось скопировать ссылку' })
            })
    }

    return (
        <Modal isVisible={true}>
            <Card>
                <Stack direction="vertical" gap="m">
                    <Article title="Ссылка на исследование">
                        {link}
                    </Article>
                    <Stack gap="m">
                        <Button style="primary" onClick={() => copyContent(link, setCopyStatus)} width="full">Копировать</Button>
                        <Button style="secondary" onClick={onCancelButtonClick} width="full">Закрыть</Button>
                    </Stack>
                    {
                        copyStatus &&
                        <Alert type={copyStatus.type}>{copyStatus.text}</Alert>
                    }
                </Stack>
            </Card>
        </Modal >
    )
}

export default LinkProvider;