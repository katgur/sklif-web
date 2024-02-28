import style from './style.module.css';

function Radio({ register, entity, children, field, validation }) {
    return (
        <label className={style.radio}>
            <input {...register(field.name, validation)} defaultChecked={entity && entity[field.name] === children} type="radio" value={children} />
            <span className={`${style.label} font__inter--sm`}>
                {children}
            </span>
        </label>
    )
}

export default Radio;