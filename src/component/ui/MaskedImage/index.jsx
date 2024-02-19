import './MaskedImage.css';

function MaskedImage({ onRequestMaskClick, result, maskRequested }) {
    return (
        <div className="masked-image">
            {!result.url &&
                <div className="outline-button centered-button" onClick={onRequestMaskClick}>
                    {!maskRequested ? 'Отправить запрос на обработку снимка' : 'Проверить статус обработки'}
                </div>
            }
            {result.url &&
                <img src={result.url} style={{ objectFit: "contain", height: "85vh" }} alt="mask" />
            }
        </div>
    )
}

export default MaskedImage