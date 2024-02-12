import './Stack.css';

function Stack({ direction, children }) {
    return (
        <div className={`stack stack_direction_${direction}`}>
            {children}
        </div>
    )
}

export default Stack