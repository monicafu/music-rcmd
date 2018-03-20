export const callGetRequest = (url) => {
	return fetch(url)
	.then( res => res.ok? res.json() : Promise.reject(res.text()) )
	.catch( error => Promise.reject('Get-failed: ' + error) );
};

export const callPostRequest = (url, data) => {
	return fetch(url, {
		method: 'POST',
		body: data
	})
	.then( res => res.ok ? res.json() : Promise.reject(res.text()) )
	.catch( error => Promise.reject('Post-failed ' + error) );
};