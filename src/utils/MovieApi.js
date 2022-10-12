class MovieApi {
	constructor(config) {
		this._baseUrl = config.baseUrl;
		this._headers = config.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка тут: ${res.status}`);
	}

	getDataMovies() {
		return fetch(`${this._baseUrl}/`, {
			method: 'GET'
		})
			.then(this._checkResponse);
	}

}


const api = new MovieApi({
	baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
})

export default api;