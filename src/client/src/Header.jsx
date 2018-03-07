import React from 'react';

// Components
import Search from './Search';
import Login from './Login';

const Header = ( {userData} ) => {

	return (
		<header>
			<div className="blank-item">Placeholder</div>
			<Search />
			<Login userData={userData}/>
		</header>
	);
};

export default Header;