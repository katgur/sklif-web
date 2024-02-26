import style from './LabelButton.module.css';

function LabelButton({ children }) {
    return (
        <button className={style.label}>
            {children}
        </button>
    )
}

export default LabelButton;