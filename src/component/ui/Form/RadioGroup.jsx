import React from 'react'

function RadioGroup({ register, field, entity, errors, children }) {
    const validation = {
        required: field.required
    }
    const error = errors[field.name];
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { register, entity, field, validation });
        }
        return child;
    });
    return (
        <div className='form__radio-group'>
            <p className="font__medium-14">
                {field.text}
                {field.required && <span className="font__regular-16 font_color_error">&nbsp;*</span>}
            </p>
            {error && <span className="font__regular-14 font_color_error">&nbsp;&nbsp;{error.message}</span>}
            {childrenWithProps}
        </div>
    )
}

export default RadioGroup