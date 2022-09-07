import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
	return (
		<section className='MoviesCardList'>
			<div className='container-movies-card'>
				<div className='MoviesCardList__container'>
					<MoviesCard />
					<MoviesCard />
					<MoviesCard />
				</div>
			</div>
		</section>
	)
}
export default MoviesCardList;