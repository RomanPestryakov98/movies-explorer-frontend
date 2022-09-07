import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/Form/logo.svg';
import { Link } from 'react-router-dom';

function Header({ onClickBurger, backColor }) {
	return (
		<header className='Header'>
			<div className='Header__container'>
				<Link className='Header__logo-link' exact to="/">
					<img src={logo} className='Header__logo' alt='logo'></img>
				</Link>
				<Navigation onClickBurger={onClickBurger} />
			</div>

		</header>
	)
}
export default Header;