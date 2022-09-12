import './NavTab.css';

function NavTab() {
	return (
		<div className="navtab">
			<div className='container'>
				<ul className='navtab__list'>
					<li className='navtab__item'>
						<a href='#' className='navtab__link'>О проекте</a>
					</li>
					<li className='navtab__item'>
						<a href='#' className='navtab__link'>Технологии</a>
					</li>
					<li className='navtab__item'>
						<a href='#' className='navtab__link'>Студент</a>
					</li>
				</ul>
			</div>
		</div>
	)
}
export default NavTab;