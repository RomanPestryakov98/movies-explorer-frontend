export function filterScreen(arr, size, counter) {
	if (arr?.length > 0) {
		if (size > 1087) {
			return arr.slice(0, (12 + 3 * counter));
		}
		if (size > 767) {
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
	if (movieName.indexOf(word) !== -1) {
		return true
	}
	else {
		return false;
	}
}

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
	if (savedMovies?.length > 0) {
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


export function validURL(str) {
	var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
	return !!pattern.test(str);
}