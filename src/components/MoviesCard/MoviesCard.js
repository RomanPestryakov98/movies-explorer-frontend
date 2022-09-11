import './MoviesCard.css';
import image from '../../images/1.jpg';

function MoviesCard() {
	return (
		<article className='MoviesCard'>
			<div className='MoviesCard__container'>
				<div className='MoviesCard__image-container'>
					<img src={image} alt="picture" className='MoviesCard__image'></img>
				</div>
				<div className='MoviesCard__content'>
					<div className='MoviesCard__top'>
						<h2 className='MoviesCard__title'>33 слова о дизайне</h2>
						<button type='button' className='MoviesCard__like'></button>
					</div>
					<p className='MoviesCard__duration'>1ч 47м</p>
				</div>
			</div>
		</article>
	)
}
export default MoviesCard;