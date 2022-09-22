export const BASE_URL = 'https://api.moviesexplorer.nomoredomains.sbs';

function checkResponse(res) {
	if (res.ok) {
		return res.json()
	}
	return Promise.reject(res)
}

export const regApi = (name, email, password) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, email, password })
	})
		.then(checkResponse)
};


export const loginApi = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	})
		.then(checkResponse)
};

export const tokenCheck = () => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	})
		.then(checkResponse);
}
