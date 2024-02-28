import style from './style.module.css'

function ProgressBar({ isProgress }) {
    return (
        <div className={style.track}>
            {isProgress && <div className={style.progress}></div>}
        </div>
    )
}

export default ProgressBar;