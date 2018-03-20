import React from 'react';
import './FilterControl.css';

const FilterControl = ( {currentGenre, onToggleNav, navState} ) => {

	return (
		<div className="filter-control">
			<div className={`filter-btn ${navState ? 'btn-change': ''}`} onClick={onToggleNav}>
				<div className="bar1"></div>
				<div className="bar2"></div>
				<div className="bar3"></div>
			</div>
			<div className="genre-tip">{currentGenre === 'All' ? 'Genre' : currentGenre}</div>
		</div>
	);
};

export default FilterControl;