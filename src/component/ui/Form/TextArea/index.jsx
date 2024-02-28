import style from "./style.module.css";

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
        <div className={style.wrapper}>
            {error && <span className="font__inter--xs font_color_error">&nbsp;&nbsp;{error.message}</span>}
            <textarea className={`${style.textarea} font__inter--sm${error ? " " + style.error : ""}`}
                {...register(field.name, validation)} placeholder={field.text} />
        </div>
    )
}

export default TextArea