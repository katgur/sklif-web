function Input({ register, field, errors }) {
    const validation = {
        required: field.required && "Обязательное поле",
        pattern: {
            value: field.pattern,
            message: "Неверный формат данных"
        }
    }
    const error = errors[field.name];
    return (
        <div className="form__input">
            <label className="font__jost--sm">
                {field.text}
                {field.required && <span className="font_color_error">&nbsp;*</span>}
            </label>
            {error && <span className="font__inter--xs font_color_error">&nbsp;&nbsp;{error.message}</span>}
            <input className={`form__field font__inter--sm${error ? " form__field--error" : ""}`} {...register(field.name, validation)}
                type={field.type}
                placeholder={field.text} />
        </div>
    )
}

export default Input