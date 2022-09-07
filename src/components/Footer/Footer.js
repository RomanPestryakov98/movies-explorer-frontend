import './Footer.css';

function Footer() {
	return (
		<footer className='Footer'>
			<div className='container'>
				<p className='Footer__caption'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
				<div className='Footer__wrap'>
					<p className="Footer__copyright">&copy; {new Date().getFullYear()}</p>
					<ul className='Footer__list'>
						<li className='Footer__item'>
							<a href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer" className='Footer__link'>Яндекс.Практикум</a>
						</li>
						<li className='Footer__item'>
							<a href="https://github.com/RomanPestryakov98" target="_blank" rel="noreferrer" className='Footer__link'>Github</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
export default Footer;