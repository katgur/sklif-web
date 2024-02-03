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
            <p className="font__medium-14">
                {field.text}
                {field.required && <span className="font__regular-16 font_color_error">&nbsp;*</span>}
            </p>
            {error && <span className="error-font">{error.message}</span>}
            <select className="form__select font__regular-16 font_color_dark" {...register(field.name, validation)}>
                {childrenWithProps}
            </select>
        </div>
    )
}

export default Select