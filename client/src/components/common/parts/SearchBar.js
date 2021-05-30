import "./SearchBar.css";

const SearchBar = ({input, placeholder, onChange}) => {
    return (
        <div className="search-bar">
            <input
                value={input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchBar;