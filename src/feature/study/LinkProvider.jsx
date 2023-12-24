import { useNavigate } from 'react-router';
import { useState } from 'react';
import Modal from '../../component/ui/Modal';
import { clientUrl, protocol } from '../../util/config';

const copyContent = async (text, setCopyStatus) => {
    try {
        await navigator.clipboard.writeText(text);
        setCopyStatus({ isSuccessfull: true, text: 'Ссылка скопирована в буфер обмена' })
    } catch (err) {
        setCopyStatus({ isSuccessfull: false, text: 'Не удалось скопировать ссылку' })
    }
}

function LinkProvider() {
    const navigate = useNavigate();
    const [modalState, setModalState] = useState({ enabled: true, coords: { top: 0, left: 0 } });
    var key = window.location.href.split('link/')[1];
    const [copyStatus, setCopyStatus] = useState();

    const onCancelButtonClick = () => {
        navigate(-1);
        setModalState({
            enabled: false,
            coords: {}
        })
    }

    var link = `${protocol}://${clientUrl}/home/viewer/${key}`;

    return (
        <Modal state={modalState} className="modal-shaded">
            <div className="rounded-card delete-form">
                <h3>Ссылка на исследование</h3>
                <p className="text-font">{link}</p>
                <div>
                    <span className="filled-button" onClick={() => copyContent(link, setCopyStatus)}>Копировать</span>
                    <span className="outline-button" onClick={onCancelButtonClick}>Закрыть</span>
                </div>
                {
                    copyStatus &&
                    <span className={copyStatus.isSuccessfull ? "alert alert-success success-text" : "alert alert-error error-text"}>{copyStatus.text}</span>
                }
            </div>
        </Modal>
    )
}

export default LinkProvider;