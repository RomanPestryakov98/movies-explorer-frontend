import './Form.css';
import logo from '../../images/Form/logo.svg';

function Form(props) {
	return (
		<div className='Form'>
			<img src={logo} alt='logo' className='Form__logo'></img>
			<h3 className='Form__title'>{props.name === 'register' ? 'Добро пожаловать!' : 'Рады видеть!'}</h3>
			<form action="#" name={props.name} className="Form__form" noValidate>
				{props.name === 'register' &&
					<label className="Form__label">
						<span className='Form__label-text'>Имя</span>
						<input type="name" className="Form__input" required />
					</label>
				}
				<label className="Form__label">
					<span className='Form__label-text'>E-mail</span>
					<input type="email" className="Form__input" required />
				</label>
				<label className="Form__label">
					<span className='Form__label-text'>Пароль</span>
					<input type="password" className="Form__input" required />
				</label>
				<div className='Form__submit-container'>
					<button type="submit" className="Form__submit">{props.name === 'register' ? 'Зарегистрироваться' : 'Войти'}</button>
				</div>
			</form>
		</div>
	)
}
export default Form;