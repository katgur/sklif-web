import React from 'react';
import './Top.css';

function Top({ children, columns }) {
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { columns });
        }
        return child;
    });

    return (
        <table className="font__jost--xs top">
            {childrenWithProps}
        </table>
    )
}

export default Top;