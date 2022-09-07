import './Techs.css';

function Techs() {
	return (
		<section className="Techs">
			<div className='container'>
				<h2 className="Techs__title">Технологии</h2>
				<div className='Techs__line'></div>
				<div className='Techs__subtitle'>7 технологий</div>
				<div className='Techs__paragraph'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</div>
				<ul className='Techs__list'>
					<li className='Techs__item'>HTML</li>
					<li className='Techs__item'>CSS</li>
					<li className='Techs__item'>JS</li>
					<li className='Techs__item'>React</li>
					<li className='Techs__item'>Git</li>
					<li className='Techs__item'>Express.js</li>
					<li className='Techs__item'>mongoDB</li>
				</ul>
			</div>
		</section>
	)
}
export default Techs;