import './MoviesCard.css';
import { validURL } from '../../utils/utils';
import { useEffect } from 'react';

function MoviesCard({ data, name, handleLike, setMovies, deleteMovieFromSavedMovies, errorLike }) {
	function setDuration(duration) {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		return `${hours}ч ${minutes}м`;
	}

	useEffect(() => {
		if (!validURL(data.trailerLink)) {
			data.trailerLink = 'https://www.youtube.com/';
		}
		// eslint-disable-next-line
	}, [])

	function onHandleLike() {
		handleLike(data, setMovies);
	}

	function onDelete() {
		deleteMovieFromSavedMovies(data);
	}

	return (
		<article className='MoviesCard'>
			<div className='MoviesCard__container'>
				<a href={validURL(data.trailerLink) ? data.trailerLink : 'https://www.youtube.com/'} target="_blank" rel="noreferrer" className='MoviesCard__image-container'>
					<img src={name === 'movies' ? `https://api.nomoreparties.co/${data.image.url}` : data.image} alt={data.nameRU} className='MoviesCard__image' />
				</a>
				<div className='MoviesCard__content'>
					<div className='MoviesCard__top'>
						<h2 className='MoviesCard__title'>{data.nameRU}</h2>
						{name === 'movies'
							?
							<button onClick={onHandleLike} type='button' className={`MoviesCard__like ${data.liked ? 'MoviesCard__like_liked' : ''}`}></button>
							:
							<button onClick={onDelete} type='button' className='MoviesCard__delete-like'></button>
						}

					</div>
					<p className='MoviesCard__duration'>{setDuration(data.duration)}</p>
				</div>
			</div>
		</article>
	)
}
export default MoviesCard;