import React from "react";

function Select({ field, errors, register, children }) {
    const validation = {
        required: field.required && "Обязательное поле",
    }
    const error = errors[field.name];

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { register, errors });
        }
        return child;
    });


    return (
        <div className="form__select-container">
            <p className="font__jost--sm">
                {field.text}
                {field.required && <span className="font__inter--m font_color_error">&nbsp;*</span>}
            </p>
            {error && <span className="font__inter-xs">{error.message}</span>}
            <select className="form__select font__inter--m" {...register(field.name, validation)}>
                {childrenWithProps}
            </select>
        </div>
    )
}

export default Select