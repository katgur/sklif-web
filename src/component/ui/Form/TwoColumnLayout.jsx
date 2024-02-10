import React, { isValidElement, cloneElement } from "react";
import './Form.css'

function TwoColumnLayout({ children, register, errors }) {
    const childrenWithProps = React.Children.map(children, child => {
        if (isValidElement(child)) {
            return cloneElement(child, { register, errors });
        }
        return child;
    });

    return (
        <div className="form__two-column-layout">
            {childrenWithProps}
        </div>
    )
}

export default TwoColumnLayout