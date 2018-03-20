import React from 'react';

const Login = ({userData}) => {
	return (
		<div className="login">
			<div className="dropdown">
				<div className="login-content">
						<a>Profile</a>
						<a>Logout</a>
				</div>
				<div className="user-name">{userData.name}</div>
			</div>
		</div>
	);
}

export default Login;