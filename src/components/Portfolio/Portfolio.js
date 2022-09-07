import './Portfolio.css';
import image from '../../images/Portfolio/Portfolio.svg';

function Portfolio() {
	return (
		<section className="Portfolio">
			<div className='container'>
				<h2 className='Portfolio__title'>Портфолио</h2>
				<ul className='Portfolio__list'>
					<li className='Portfolio__item'>
						<a href="https://romanpestryakov98.github.io/how-to-learn/" target="_blank" rel="noreferrer" className='Portfolio__link'>Статичный сайт</a>
						<img src={image} alt='Иконка для ссылки' className='Portfolio__image'></img>
					</li>
					<li className='Portfolio__item'>
						<a href="https://romanpestryakov98.github.io/russian-travel/" target="_blank" rel="noreferrer" className='Portfolio__link'>Адаптивный сайт</a>
						<img src={image} alt='Иконка для ссылки' className='Portfolio__image'></img>
					</li>
					<li className='Portfolio__item'>
						<a href='https://mesto.nomoredomains.sbs/' target="_blank" rel="noreferrer" className='Portfolio__link'>Одностраничное приложение</a>
						<img src={image} alt='Иконка для ссылки' className='Portfolio__image'></img>
					</li>
				</ul>
			</div>
		</section>
	)
}
export default Portfolio;