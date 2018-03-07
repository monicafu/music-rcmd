import React from 'react';

const Login = ({userName}) => {
	return (
		<div className="Login">
			<div className="user-name">{userName}</div>
			<div className="expand-icon">*</div>
		</div>
	);
}

export default Login;