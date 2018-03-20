import React from 'react';
import './Header.css';

// Components
import Search from './Search';
import Login from './Login';

const Header = ( {searchContent, userData, onSearch} ) => {

	return (
		<header>
			<div className="blank-item">Placeholder</div>
			<Search searchContent={searchContent} onSearch={onSearch} />
			<Login userData={userData} />
		</header>
	);
};

export default Header;