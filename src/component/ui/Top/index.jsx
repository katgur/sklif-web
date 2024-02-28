import React from 'react';
import style from './style.module.css'

function Top({ children, columns }) {
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { columns });
        }
        return child;
    });

    return (
        <table className={`font__jost--xs ${style.top}`}>
            {childrenWithProps}
        </table>
    )
}

export default Top;