import style from './style.module.css'

function MaskedImage({ url }) {
    return (
        <div className={style.wrapper}>
            {url && <img className={style.mask} src={url} alt="mask" />}
        </div>
    )
}

export default MaskedImage