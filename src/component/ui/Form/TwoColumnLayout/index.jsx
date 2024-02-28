import React, { isValidElement, cloneElement } from "react";
import style from './style.module.css'

function TwoColumnLayout({ children, register, errors }) {
    const childrenWithProps = React.Children.map(children, child => {
        if (isValidElement(child)) {
            return cloneElement(child, { register, errors });
        }
        return child;
    });

    return (
        <div className={style.wrapper}>
            {childrenWithProps}
        </div>
    )
}

export default TwoColumnLayout