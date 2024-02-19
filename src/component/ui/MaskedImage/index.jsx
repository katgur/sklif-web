import './MaskedImage.css';

function MaskedImage({ url }) {
    return (
        <div className="mask">
            {url && <img className="mask__image" src={url} alt="mask" />}
        </div>
    )
}

export default MaskedImage