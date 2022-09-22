import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useState, useEffect } from 'react';
import { filter } from '../../utils/utils';


function Movies({ isLoading, onSubmit, errorMovies, handleLike, handleCheckbox, data, notFound }) {
	const [movies, setMovies] = useState(data.movies ? filter(data.movies, data) : []);

	useEffect(() => {
		if (data.movies) {
			setMovies(filter(data.movies, data))
		}
	}, [data])

	return (
		<>
			<SearchForm name='movies' onSubmit={onSubmit} setMovies={setMovies} handleCheckbox={handleCheckbox} data={data} />
			<MoviesCardList handleLike={handleLike} name='movies' isLoading={isLoading} movies={movies} errorMovies={errorMovies} setMovies={setMovies} notFound={notFound} />
		</>
	)
}
export default Movies;