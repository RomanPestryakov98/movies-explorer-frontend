import './AboutProject.css';

function AboutProject() {
	return (
		<section className="AboutProject" id='about-project'>
			<div className='container'>
				<h2 className="AboutProject__title">О проекте</h2>
				<div className='AboutProject__line'></div>
				<div className='AboutProject__features'>
					<article className='AboutProject__feature'>
						<h3 className='AboutProject__subtitle'>Дипломный проект включал 5 этапов</h3>
						<p className='AboutProject__paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
					</article>
					<article className='AboutProject__feature'>
						<h3 className='AboutProject__subtitle'>На выполнение диплома ушло 5 недель</h3>
						<p className='AboutProject__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
					</article>
				</div>
				<div className='AboutProject__timeline timeline'>
					<div className='timeline__bar-wrap'>
						<div className='timeline__bar timeline__bar_back'>1 неделя</div>
						<div className='timeline__bar timeline__bar_front'>4 недели</div>
					</div>
					<div className='timeline__caption-wrap'>
						<div className='timeline__caption timeline__caption_back'>Back-end</div>
						<div className='timeline__caption timeline__caption_front'>Front-end</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutProject;