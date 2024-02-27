import './Stack.css';

function Stack({ direction, gap, align, children }) {
    return (
        <div className={`stack stack_direction_${direction} stack_gap_${gap} stack_align_${align}`}>
            {children}
        </div>
    )
}

export default Stack