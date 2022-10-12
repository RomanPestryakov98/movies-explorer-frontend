import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/Form/logo.svg';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

function Header({ onClickBurger, isLoggedIn }) {
	return (
		<Switch>
			<Route exact path='/'>
				<header className='Header'>
					<div className='Header__container'>
						<Link className='Header__logo-link' to="/">
							<img src={logo} className='Header__logo' alt='logo'></img>
						</Link>
						<Navigation isLoggedIn={isLoggedIn} onClickBurger={onClickBurger} />
					</div>
				</header>
			</Route>
			<Route path='/(movies|saved-movies|profile)'>
				<header className='Header'>
					<div className='Header__container'>
						<Link className='Header__logo-link' to="/">
							<img src={logo} className='Header__logo' alt='logo'></img>
						</Link>
						<Navigation isLoggedIn={isLoggedIn} onClickBurger={onClickBurger} />
					</div>
				</header>
			</Route>
		</Switch>
	)
}
export default Header;