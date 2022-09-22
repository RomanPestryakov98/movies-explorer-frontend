import SearchForm from '../SearchForm/SearchForm';
import MainApi from '../../utils/MainApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from 'react';

function SavedMovies({ deleteMovieFromSavedMovies, handleCheckbox, data, onSubmit }) {
	const [moviesSaved, setMoviesSaved] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		MainApi.getMovies()
			.then(res => {
				if (data.checkbox) {
					setMoviesSaved(() => res.filter(c => c.duration <= 40));
				}
				else {
					setMoviesSaved(res);
				}
			})
	}, [data])

	function handleIsLoading(state) {
		setIsLoading(state)
	}


	return (
		<>
			<SearchForm
				name='saved-movies'
				valueSearch={JSON.parse(localStorage.getItem('data'))?.movie}
				onSetLoading={handleIsLoading}
				setMoviesSaved={setMoviesSaved}
				data={data}
				movies={moviesSaved}
				onSubmit={onSubmit}
				handleCheckbox={handleCheckbox}
			/>
			<MoviesCardList
				name='saved-movies'
				isLoading={isLoading}
				movies={moviesSaved}
				data={data}
				deleteMovieFromSavedMovies={deleteMovieFromSavedMovies}
				setMoviesSaved={setMoviesSaved}
			/>
		</>
	)
}
export default SavedMovies;