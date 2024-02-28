import style from './style.module.css';

function Checkbox({ register, field }) {
    return (
        <label className={style.checkbox}>
            <input {...register(field.name)} type="checkbox" className={style.checkboxInput} />
            <span className="font__inter--sm font_color_text">{field.text}</span>
        </label>
    )
}

export default Checkbox;