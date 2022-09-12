import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import Burger from '../Burger/Burger';

function Navigation(props) {
	return (
		<div className='Navigation'>

			{props.isAuth === 'non-auth' ?
				<div className='Navigation__not-authorized'>
					<Link className='Navigation__register' to="/signup">Регистрация</Link>
					<Link className='Navigation__entry' to="/signin">Вход</Link>
				</div>
				:
				<>
					<div className='Navigation__authorized'>
						<ul className='Navigation__films'>
							<li className='Navigation__item Navigation__item_main'>
								<NavLink activeClassName="Navigation__link_active" className='Navigation__link' exact to="/">Главная</NavLink>
							</li>
							<li className='Navigation__item'>
								<NavLink activeClassName="Navigation__link_active" className='Navigation__link' to="/movies">Фильмы</NavLink>
							</li>
							<li className='Navigation__item'>
								<NavLink activeClassName="Navigation__link_active" className='Navigation__link' to="/saved-movies">Сохранённые фильмы</NavLink>
							</li>
						</ul>
						<Link className='Navigation__account' to="/profile">Аккаунт</Link>
					</div>
					<Burger onClickBurger={props.onClickBurger} />
				</>
			}

		</div>
	)
}
export default Navigation;