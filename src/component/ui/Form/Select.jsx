function Select({ field, errors, register, children }) {
    const validation = {
        required: field.required && "Обязательное поле",
    }
    const error = errors[field.name];
    return (
        <div>
            <p>{field.text}</p>
            {error && <span className="error-font">{error.message}</span>}
            <select>
                {children}
            </select>
        </div>
    )
}

export default Select