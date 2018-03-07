import React from 'react';

const Login = ({userData}) => {
	return (
		<div className="login">
			<div className="user-name">{userData.name}</div>
		</div>
	);
}

export default Login;