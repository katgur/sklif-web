import './Checkbox.css';

function Checkbox({ onChange }) {
    return (
        <label>
            <input type="checkbox" className="checkbox" onChange={onChange} />
        </label>
    )
}

export default Checkbox;