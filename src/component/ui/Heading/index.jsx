import React from "react";

function Heading({ variant, children }) {
    return (
        React.createElement(variant, { className: `font--${variant}`, children })
    )
}

export default Heading;