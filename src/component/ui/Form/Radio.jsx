function Radio({ register, entity, children, field, validation }) {
    return (
        <label className="form__radio">
            <input {...register(field.name, validation)} defaultChecked={entity && entity[field.name] === value} type="radio" value={children} />
            <span className="form__label font__regular-16 font_color_dark">
                {children}
            </span>
        </label>
    )
}

export default Radio;