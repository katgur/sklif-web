import './Scroll.css';

function Scroll({ total, current }) {

    var marginLeft = Math.round(current / total * 100);
    var width = Math.round((1 / total * 100));

    return (
        <div className="scroll">
            <div className="scroll__track" style={{ marginLeft: `${marginLeft}%`, width: `${width}%` }}></div>
        </div>
    )
}

export default Scroll;