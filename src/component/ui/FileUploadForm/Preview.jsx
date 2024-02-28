import style from './style.module.css'

function Preview({ fileURL }) {
    return (fileURL &&
        <div>
            <img className={style.previewImage} src={fileURL} alt="Preview." />
        </div>
    )
}

export default Preview