import './ProgressBar.css';

function ProgressBar({ isProgress }) {
    return (
        <div className="progress-track">
            {isProgress && <div className="progress-value"></div>}
        </div>
    )
}

export default ProgressBar;