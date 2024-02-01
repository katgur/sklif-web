function Select({ field, errors, register }) {
    const validation = {
        required: field.required && "Обязательное поле",
    }
    const error = errors[field.name];
    return (
        <div>
            <p>{field.text}</p>
            {error && <span className="error-font">{error.message}</span>}
            <select
                key={field.name} {...register(field.name, validation)}>
                {field.options.map((option) => {
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select