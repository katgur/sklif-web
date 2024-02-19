import './Picture.css';

function Picture({ avatarURL, children }) {
    return (
        <div className='picture'>
            <img src={avatarURL} className="avatar" alt="avatar" />
            {children}
        </div>
    )
}

export default Picture