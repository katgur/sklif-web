import './Card.css';

function Card({ children, padding, width }) {
    return (
        <div className={`card card_padding_${padding} card--${width} font__inter--sm`}>
            {children}
        </div>
    )
}

export default Card