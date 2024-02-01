function Radio({ register, entity, errors }) {
    const validation = {
        required: field.required
    }
    const error = errors[field.name];
    return (
        <div>
            <p>{field.text}</p>
            {field.required && <span className="font__regular-16 font_color_error">&nbsp;*</span>}
            {error && <span className="font__regular-14 font_color_error">&nbsp;&nbsp;{error.message}</span>}
            {field.options.map((option, index) => {
                return (
                    <label key={option}>
                        <input
                            {...register(field.name, validation)}
                            type='radio'
                            defaultChecked={entity ? entity[field.name] === option : index === 0}
                            className={field.style}
                            value={option} />
                        {option}
                    </label>
                )
            })}
        </div>
    )
}

export default Radio