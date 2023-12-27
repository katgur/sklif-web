function SearchBar({ onSearchClick }) {
    const onSubmit = (e) => {
        e.preventDefault();
        onSearchClick(e.target.value);
    }

    return (
        <form onSubmit={onSubmit}>
            <input className="header__input" type="text" placeholder="Поиск..." />
        </form>
    )
}

export default SearchBar;