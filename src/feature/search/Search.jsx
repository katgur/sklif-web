import useSearch from "../../hook/useSearch";
import SearchItem from "./SearchItem";
import { Stack } from 'tailwind-admin';

function Search() {
    const data = useSearch();

    if (!data || data.length === 0) {
        return <p>Ничего не найдено</p>;
    }

    return (
        <Stack>
            {
                data.map((item, index) => <SearchItem key={index} {...item} />)
            }
        </Stack>
    )
}

export default Search;