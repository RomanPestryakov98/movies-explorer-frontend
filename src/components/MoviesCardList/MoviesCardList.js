import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import React, { useEffect, useState } from 'react';
import { filterScreen } from '../../utils/utils';

function MoviesCardList({ movies, isLoading, setMessageAfterSubmit, name, handleLike, deleteMovieFromSavedMovies, errorLike, data }) {
	const [counterMovies, setCounterMovies] = useState(0);
	const [sizeScreen, setSizeScreen] = useState(window.screen.width);

	useEffect(() => {
		let timeOut = null;
		const checkResize = () => {
			clearTimeout(timeOut);
			timeOut = setTimeout(() => {
				setSizeScreen(window.screen.width);
			}, 150);
		};
		window.addEventListener('resize', checkResize);
		return () => window.removeEventListener('resize', checkResize);
	}, [sizeScreen]);

	function handleCounterMovies() {
		setCounterMovies(counterMovies + 1);
	}

	return (
		<section className='MoviesCardList'>
			<div className='container-movies-card'>
				<div className='MoviesCardList__container'>
					{(data?.searchWord && movies.length === 0) && <p className='MoviesCardList__not-found'>Ничего не найдено</p>}
					{isLoading ?
						<Preloader />
						:
						filterScreen(movies, sizeScreen, counterMovies).map((movie) => (
							< MoviesCard
								handleLike={handleLike}
								movies={movies}
								data={movie}
								name={name}
								deleteMovieFromSavedMovies={deleteMovieFromSavedMovies}
								errorLike={errorLike}
								key={name === 'movies' ? movie.id : movie._id}
							/>
						))
					}
					{setMessageAfterSubmit
						&&
						<p className='MoviesCardList__error'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
					}
				</div>
				{filterScreen(movies, sizeScreen, counterMovies).length !== movies.length && name !== 'saved-movies'
					&& <button onClick={handleCounterMovies} className='MoviesCardList__more' type='button'>Ёще</button>
				}
			</div>
		</section >
	)
}
export default MoviesCardList;