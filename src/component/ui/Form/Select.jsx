import React, { useState } from "react";

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
        <div className="form__input">
            <p className="font__jost--sm">
                {field.text}
                {field.required && <span className="font__inter--m font_color_error">&nbsp;*</span>}
            </p>
            {error && <span className="font__inter--xs">{error.message}</span>}
            <div className="form__select font__inter--sm">
                <div onClick={() => setExpanded(!expanded)}>
                    {options[selected]}
                </div>
                {
                    expanded &&
                    <ul className="form__options">
                        {options.map((option, index) => {
                            return (
                                <li className={"form__option" + (selected === index ? " form__option--checked" : "")} key={option}>
                                    <label onClick={() => onSelectChange(index)}>
                                        {option}
                                        <input className="form__option-input"
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