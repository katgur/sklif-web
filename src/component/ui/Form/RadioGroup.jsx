import React from 'react'

function RadioGroup({ field, register, entity, errors, children }) {
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
            <p className="font__jost--sm">
                {field.text}
                {field.required && <span className="font_color_error">&nbsp;*</span>}
            </p>
            {error && <span className="font__inter--xs font_color_error">&nbsp;&nbsp;{error.message}</span>}
            {childrenWithProps}
        </div>
    )
}

export default RadioGroup