import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useWindowSize from "../../hook/useWindowSize";

const chevronDownIcon = (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0.410093 0.910826C0.73553 0.585389 1.26317 0.585389 1.58861 0.910826L5.99935 5.32157L10.4101 0.910826C10.7355 0.585389 11.2632 0.585389 11.5886 0.910826C11.914 1.23626 11.914 1.7639 11.5886 2.08934L6.58861 7.08933C6.26317 7.41477 5.73553 7.41477 5.4101 7.08933L0.410093 2.08934C0.0846563 1.7639 0.0846563 1.23626 0.410093 0.910826Z" fill="#8A99AF" />
    </svg>
)

const chevronUpIcon = (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M11.5892 7.08917C11.2637 7.41461 10.7361 7.41461 10.4107 7.08917L5.99992 2.67843L1.58917 7.08918C1.26374 7.41461 0.736098 7.41461 0.410662 7.08918C0.0852243 6.76374 0.0852242 6.2361 0.410662 5.91066L5.41066 0.910663C5.7361 0.585226 6.26374 0.585226 6.58917 0.910663L11.5892 5.91066C11.9146 6.2361 11.9146 6.76374 11.5892 7.08917Z" fill="#8A99AF" />
    </svg>
)

const maximized = (menu, expanded, onOptionClick) => (
    menu &&
    menu.map((option1, index) => {
        const chevronIcon = expanded[index] ? chevronUpIcon : chevronDownIcon;
        return (
            <li key={option1.text}>
                <span onClick={() => onOptionClick(index)}>
                    {option1.icon}
                    {option1.text}
                    <span className="last">{chevronIcon}</span>
                </span>
                {
                    expanded[index] &&
                    <ul>
                        {option1.options.map((option2) => {
                            return (
                                <li key={option2.text}>
                                    <Link to={option2.route}>
                                        {option2.text}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                }
            </li>
        )
    })
)

const minimized = (menu) => (
    menu &&
    menu.map((option1) => {
        return (
            <ul>
                {
                    option1.options.map((option2) => {
                        return (
                            <li key={option2.text}>
                                <Link to={option2.route}>
                                    {option2.icon}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        )
    })
)

function Drawer({ header, menu, className }) {
    const [expanded, setExpanded] = useState(Array(menu.length).fill(false));
    const windowSize = useWindowSize();

    const classNameString = className ? "drawer " + className : "drawer";
    const onOptionClick = (index) => {
        const expanded1 = [...expanded];
        expanded1[index] = !expanded1[index];
        setExpanded(expanded1);
    }

    return (
        <div className={classNameString}>
            <h1>
                {header}
            </h1>
            {windowSize && windowSize.width >= 800 && maximized(menu, expanded, onOptionClick)}
            {windowSize && windowSize.width < 800 && minimized(menu)}
        </div>
    )
}

export default React.memo(Drawer);