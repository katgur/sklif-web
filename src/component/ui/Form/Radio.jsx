function Radio({ register, entity, children, field, validation }) {
    return (
        <label class="form__radio">
            <input {...register(field.name, validation)} defaultChecked={entity && entity[field.name] === value} type="radio" value={children} />
            <span className="form__label">
                {children}
            </span>
        </label>
    )
}

export default Radio;