export function filterScreen(arr, size, counter) {
	if (arr?.length > 0) {
		if (size > 1087) {
			return arr.slice(0, (12 + 3 * counter));
		}
		if (size > 689) {
			return arr.slice(0, (8 + 2 * counter));
		}
		else {
			return arr.slice(0, (5 + 1 * counter));
		}
	}
	return arr;
}

export function filter(movies, data) {
	if (data.checkbox) {
		return movies.filter(movie => movie.duration <= 40 && filterWord(movie.nameRU.toLowerCase(), data.searchWord.toLowerCase()));
	}
	return movies.filter(movie => filterWord(movie.nameRU.toLowerCase(), data.searchWord.toLowerCase()));
}

function filterWord(movieName, word) {
	return movieName.startsWith(word);
}

export function setDataLocalStorage(data, movies) {
	localStorage.setItem('data', JSON.stringify({
		searchWord: data.movie,
		checkbox: data.checkbox,
		movies: movies
	}))
};

export function handleLikeLocalStorage(movie) {
	if (JSON.parse(localStorage.getItem('data'))) {
		return JSON.parse(localStorage.getItem('data')).movies.map(c => {
			if (c.nameRU === movie.nameRU) {
				c.liked = !c.liked;
				c._id = movie._id;
				return c;
			}
			return c;
		})
	}
}

export function compareSavedWithMovies(newMovies, savedMovies) {
	if (savedMovies.length > 0) {
		return newMovies.map(c => {
			const movie = savedMovies.find(savedMovie => savedMovie.nameRU === c.nameRU);
			if (movie) {
				c.liked = true;
				c._id = movie._id;
			}
			return c;
		})
	}
	return newMovies;
}
