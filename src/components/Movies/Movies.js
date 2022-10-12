import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useState, useEffect } from 'react';
import { filter } from '../../utils/utils';

function Movies({ isLoading, onSubmit, handleLike, handleCheckbox, dataMovies, notFoundAfterSubmit, errorLike }) {
	const [movies, setMovies] = useState(dataMovies?.movies ? dataMovies.movies : []);

	useEffect(() => {
		if (dataMovies.movies) {
			setMovies(filter(dataMovies.movies, dataMovies))
		}
	}, [dataMovies])

	return (
		<>
			<SearchForm name='movies' onSubmit={onSubmit} handleCheckbox={handleCheckbox} data={dataMovies} />
			<MoviesCardList
				handleLike={handleLike}
				name='movies'
				isLoading={isLoading}
				movies={movies}
				notFoundAfterSubmit={notFoundAfterSubmit}
				errorLike={errorLike}
				data={dataMovies}
			/>
		</>
	)
}
export default Movies;