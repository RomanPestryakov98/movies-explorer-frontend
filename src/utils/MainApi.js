class MainApi {
	constructor(config) {
		this._baseUrl = config.baseUrl;
		this._headers = config.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(res);
	}

	createMovie(movie) {
		return fetch(`${this._baseUrl}/movies`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				country: movie.country,
				director: movie.director,
				duration: movie.duration,
				year: movie.year,
				description: movie.description,
				image: `https://api.nomoreparties.co/${movie.image.url}`,
				trailerLink: movie.trailerLink,
				thumbnail: `https://api.nomoreparties.co/${movie.image.url}`,
				movieId: movie.id,
				nameRU: movie.nameRU,
				nameEN: movie.nameEN,
			})
		})
			.then(this._checkResponse);
	}

	getMovies() {
		return fetch(`${this._baseUrl}/movies`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(this._checkResponse);
	}

	updateProfile(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				name: data.name
			})
		})
			.then(this._checkResponse);
	}

	signout() {
		return fetch(`${this._baseUrl}/signout`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(this._checkResponse);
	}

	deleteMovie(id) {
		return fetch(`${this._baseUrl}/movies/${id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(this._checkResponse);
	}
}


const apiMain = new MainApi({
	baseUrl: 'https://api.moviesexplorer.nomoredomains.sbs'
})

export default apiMain;