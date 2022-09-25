import SearchForm from '../SearchForm/SearchForm';
import MainApi from '../../utils/MainApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from 'react';

function SavedMovies({ deleteMovieFromSavedMovies, setSavedMovies, savedMovies, onSubmit }) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!localStorage.getItem('dataSaved')) {
			MainApi.getMovies()
				.then(res => {
					setSavedMovies(res);
					localStorage.setItem('dataSaved', JSON.stringify(res))
				})
				.catch(err => {
					console.log(err)
				})
		}
		// eslint-disable-next-line
	}, [])

	function handleIsLoading(state) {
		setIsLoading(state)
	}

	return (
		<>
			<SearchForm
				name='saved-movies'
				onSetLoading={handleIsLoading}
				onSubmit={onSubmit}
			/>
			<MoviesCardList
				name='saved-movies'
				isLoading={isLoading}
				movies={savedMovies}
				deleteMovieFromSavedMovies={deleteMovieFromSavedMovies}
			/>
		</>
	)
}
export default SavedMovies;