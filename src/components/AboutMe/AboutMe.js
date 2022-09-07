import './AboutMe.css';
import image from '../../images/AboutMe/Avatar.jpg';

function AboutMe() {
	return (
		<section className="AboutMe">
			<div className='container'>
				<h2 className="AboutMe__title">Студент</h2>
				<div className='AboutMe__line'></div>
				<div className='AboutMe__wrap'>
					<div className='AboutMe__info'>
						<h3 className='AboutMe__name'>Роман</h3>
						<p className='AboutMe__profile'>Фронтенд-разработчик, 24 года</p>
						<p className='AboutMe__paragraph'>Я живу в Москве, закончил гуманитарный факультет АГЗ МЧС. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
						<ul className='AboutMe__list'>
							<li className='AboutMe__item'>
								<a href='https://github.com/RomanPestryakov98' className='AboutMe__link'>Github</a>
							</li>
						</ul>
					</div>
					<div className='AboutMe__image'>
						<img src={image} alt="Аватар"></img>
					</div>
				</div>
			</div>
		</section>
	)
}
export default AboutMe;