import style from './style.module.css'

function Stack({ direction = "vertical", gap = "m", align = "center", children }) {
    return (
        <div className={`${style.stack} ${style[`stack_direction_${direction}`]} ${style[`stack_gap_${gap}`]} ${style[`stack_align_${align}`]}`}>
            {children}
        </div>
    )
}

export default Stack