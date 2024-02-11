function Radio({ register, entity, children, field, validation }) {
    return (
        <label className="form__radio">
            <input {...register(field.name, validation)} defaultChecked={entity && entity[field.name] === children} type="radio" value={children} />
            <span className="form__label font__inter--sm">
                {children}
            </span>
        </label>
    )
}

export default Radio;