import React from 'react'

function BasicLayout({ header, drawer, content }) {
    return (
        <div className="basic-layout">
            <div className="basic-layout__drawer">{drawer}</div>
            {header}
            <div className="basic-layout__content">{content}</div>
        </div>
    )
}

export default BasicLayout;