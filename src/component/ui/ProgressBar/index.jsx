import './ProgressBar.css';

function ProgressBar({ isProgress }) {
    return (
        <div className="progress__track">
            {isProgress && <div className="progress__value"></div>}
        </div>
    )
}

export default ProgressBar;