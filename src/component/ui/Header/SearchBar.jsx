import style from './style.module.css';

function SearchBar({ onSearchClick }) {
    const onSubmit = (e) => {
        e.preventDefault();
        onSearchClick(e.target.value);
    }

    return (
        <form onSubmit={onSubmit}>
            <input className={`${style.input} font__nunito--xs`} type="text" placeholder="Поиск..." />
        </form>
    )
}

export default SearchBar;