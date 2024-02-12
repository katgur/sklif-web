import './Stack.css';

function Stack({ direction, gap, children }) {
    return (
        <div className={`stack stack_direction_${direction} stack_gap_${gap}`}>
            {children}
        </div>
    )
}

export default Stack