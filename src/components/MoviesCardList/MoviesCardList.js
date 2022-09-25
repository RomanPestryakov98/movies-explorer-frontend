import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import React, { useEffect, useState } from 'react';
import { filterScreen } from '../../utils/utils';


function MoviesCardList({ movies, isLoading, setMessageAfterSubmit, name, handleLike, deleteMovieFromSavedMovies, notFound }) {
	const [counterMovies, setCounterMovies] = useState(0);
	const [sizeScreen, setSizeScreen] = useState(window.screen.width);

	useEffect(() => {
		function handleResize() {
			setSizeScreen(window.screen.width);
		}
		window.addEventListener('resize', () => {
			setTimeout(handleResize, 2000);
		});
	})

	function handleCounterMovies() {
		setCounterMovies(counterMovies + 1);
	}

	return (
		<section className='MoviesCardList'>
			<div className='container-movies-card'>
				<div className='MoviesCardList__container'>
					{(movies.length === 0 && notFound) && <p className='MoviesCardList__not-found'>Ничего не найдено</p>}
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