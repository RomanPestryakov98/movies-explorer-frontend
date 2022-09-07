import './Promo.css';
import image from '../../images/Promo/Promo.svg';

function Promo() {
	return (
		<section className="Promo">
			<div className='container'>
				<div className='Promo__container'>
					<div className="Promo__info">
						<h1 className="Promo__title">Учебный проект студента факультета Веб-разработки.</h1>
						<p className="Promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
						<a href='#about-project' className='Promo__button'>Узнать больше</a>
					</div>
					<div className="Promo__image-container">
						<img className="Promo__image" src={image} alt="картинка"></img>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Promo;