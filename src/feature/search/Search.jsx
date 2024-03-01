import useSearch from "../../hook/useSearch";
import SearchItem from "./SearchItem";

function Search() {
    const data = useSearch();

    if (!data) {
        return;
    }

    return (
        <>
            {
                data.map((item, index) => <SearchItem key={index} {...item} />)
            }
        </>
    )
}

export default Search;