import React from 'react';

const Search = ( {searchContent, onSearch} ) => {

	const searchHandler = (event) => {
		onSearch(event.target.value);
	}

	const clearHandler = () => {
		document.querySelector('.search-bar').value = null;
		onSearch(null);
	}

	return (
		<div className="search">
			<input className="search-bar" 
			       type="text" 
			       placeholder="Title / Artist / Album"
			       maxLength="50" 
			       onChange={searchHandler} />
			<div className="search-btn" onClick={clearHandler}> 
				<div className={ `search-icon ${ searchContent ? 'clear-icon' : '' }` } ></div>
			</div>
		</div>
	);
};

export default Search;