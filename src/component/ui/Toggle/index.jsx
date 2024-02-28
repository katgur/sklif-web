import style from './style.module.css'

function Toggle({ onChange, children }) {
    return (
        <div className="toggle">
            <label className="toggle__label">
                <input type="checkbox" onChange={onChange} />
                <span className="toggle__slider"></span>
            </label>
            {children}
        </div>
    )
}

export default Toggle