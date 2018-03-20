import React from 'react';
import './Filter.css';

const Filter = ( {genres, onGenreChange, onToggleNav, navState} ) => {
	const filterHandler = (event) => {
		onGenreChange(event.target.innerHTML.replace(/&amp;/g, '&'));
		onToggleNav();
	}

	const links = genres.map( (genre, index) => {
		return (
			<a onClick={filterHandler} key={index}>{genre}</a>
		);
	});


	return (
		<div className={`filter ${navState ? 'filter-change': ''}`}>
			{links}
		</div>
	);
};

export default Filter;