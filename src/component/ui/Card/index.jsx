import './Card.css';

function Card({ children, padding }) {
    return (
        <div className={`card card_padding_${padding}`}>
            {children}
        </div>
    )
}

export default Card