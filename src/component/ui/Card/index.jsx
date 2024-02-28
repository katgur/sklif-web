import style from './style.module.css'

function Card({ children, padding = "m", width = "" }) {
    return (
        <div className={`${style.card} ${style[`card_padding_${padding}`]} ${style[width]} font__inter--sm`}>
            {children}
        </div>
    )
}

export default Card