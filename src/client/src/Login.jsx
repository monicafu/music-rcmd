import React from 'react';

const Login = ({userData}) => {
	return (
		<div className="login">
			<div className="dropdown">
				<div className="login-content">
						<a href="#">Profile</a>
						<a href="#">Logout</a>
				</div>
				<div className="user-name">{userData.name}</div>
			</div>
		</div>
	);
}

export default Login;