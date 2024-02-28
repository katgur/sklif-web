import style from './style.module.css'

function LabelButton({ children }) {
    return (
        <button className={style.label}>
            {children}
        </button>
    )
}

export default LabelButton;