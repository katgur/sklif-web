import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

function SearchBar({ path }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    var onSearch = (data) => {
        navigate(`/home/${path}/search/${data.search}`);
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit(onSearch)}>
            <input {...register('search', { required: true })} className="search-input" type="text" placeholder="Поиск" />
        </form>
    )
}

export default SearchBar;