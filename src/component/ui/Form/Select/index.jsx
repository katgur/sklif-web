import React, { useState } from "react";
import style from './style.module.css';

function Select({ field, errors, register, options }) {
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(false);

    if (!options || options.length === 0) {
        return;
    }

    const validation = {
        required: field.required && "Обязательное поле",
    }
    const error = errors[field.name];

    const onSelectChange = (index) => {
        setSelected(index);
    }

    return (
        <div className={style.wrapper}>
            <p className="font__jost--sm">
                {field.text}
                {field.required && <span className="font__inter--m font_color_error">&nbsp;*</span>}
            </p>
            {error && <span className="font__inter--xs">{error.message}</span>}
            <div className={`${style.select} font__inter--sm`}>
                <div onClick={() => setExpanded(!expanded)}>
                    {options[selected]}
                </div>
                {
                    expanded &&
                    <ul className={style.options}>
                        {options.map((option, index) => {
                            return (
                                <li className={style.option + (selected === index ? " " + style.checked : "")} key={option}>
                                    <label onClick={() => onSelectChange(index)}>
                                        {option}
                                        <input className={style.optionInput}
                                            {...register(field.name, validation)}
                                            defaultChecked={selected === index}
                                            type="radio" value={option} />
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                }
            </div>
        </div>
    )
}

export default Select;