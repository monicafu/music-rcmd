export const callGetRequest = (url) => {
	return fetch(url)
	.then( res => res.ok? res.json() : Promise.reject(res.text()) )
	.catch( error => Promise.reject('Get-failed') );
};

export const callPostRequest = (url, data) => {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		header: new Headers( {'Content-Type': 'application/json'} )
	})
	.then( res => res.ok ? res.json() : Promise.reject(res.text()) )
	.catch( error => Promise.reject('Post-failed') );
};