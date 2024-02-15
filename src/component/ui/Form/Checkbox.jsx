function Checkbox({ register, field }) {
    return (
        <label className="form__checkbox">
            <input {...register(field.name)} type="checkbox" className="form__checkbox-input" />
            <span className="font__inter--sm font_color_text">{field.text}</span>
        </label>
    )
}

export default Checkbox;