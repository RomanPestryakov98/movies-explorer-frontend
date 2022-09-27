import SearchForm from '../SearchForm/SearchForm';
import MainApi from '../../utils/MainApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from 'react';
import { filter } from '../../utils/utils';

function SavedMovies({ deleteMovieFromSavedMovies, setDataSavedMovies, dataSavedMovies, onSubmit, handleCheckbox, notFoundAfterSubmit }) {
	const [isLoading, setIsLoading] = useState(false);
	const [movies, setMovies] = useState(dataSavedMovies.movies ? dataSavedMovies.movies : []);

	useEffect(() => {
		if (!dataSavedMovies.movies) {
			MainApi.getMovies()
				.then(res => {
					localStorage.setItem('dataSaved', JSON.stringify({ searchWord: '', checkbox: false, movies: res }));
					setDataSavedMovies(JSON.parse(localStorage.getItem('dataSaved')));
				})
		}
		else {
			setMovies(filter(dataSavedMovies.movies, dataSavedMovies))
		}
		// eslint-disable-next-line
	}, [dataSavedMovies])

	function handleIsLoading(state) {
		setIsLoading(state)
	}

	return (
		<>
			<SearchForm
				name='saved-movies'
				onSetLoading={handleIsLoading}
				onSubmit={onSubmit}
				data={dataSavedMovies}
				handleCheckbox={handleCheckbox}
			/>
			<MoviesCardList
				name='saved-movies'
				isLoading={isLoading}
				movies={movies}
				deleteMovieFromSavedMovies={deleteMovieFromSavedMovies}
				notFoundAfterSubmit={notFoundAfterSubmit}
				data={dataSavedMovies}
			/>
		</>
	)
}
export default SavedMovies;