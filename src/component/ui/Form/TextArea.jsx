function TextArea({ register, field, errors }) {
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
            {error && <span className="font__inter--xs font_color_error">&nbsp;&nbsp;{error.message}</span>}
            <textarea className={`form__textarea font__inter--sm${error ? " form__field--error" : ""}`}
                {...register(field.name, validation)} placeholder={field.text} />
        </div>
    )
}

export default TextArea