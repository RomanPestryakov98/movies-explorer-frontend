import './Form.css';
import logo from '../../images/Form/logo.svg';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { isEmail } from 'validator';

function Form({ onRegistration, onLogin, name, errorReg, isSubmitRegister }) {
	const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
	const clasNameButton = 'Form__submit';
	const clasNameButtonValid = 'Form__submit Form__submit_valid';

	function onSubmit(data) {
		if (name === 'register') {
			onRegistration(data);

		}
		if (name === 'login') {
			onLogin(data);
		}
	}

	return (
		<div className='Form'>
			<Link className='Form__logo-link' to="/">
				<img src={logo} alt='logo' className='Form__logo'></img>
			</Link>
			<h3 className='Form__title'>{name === 'register' ? 'Добро пожаловать!' : 'Рады видеть!'}</h3>
			<form action="#" name={name} className="Form__form" noValidate onSubmit={handleSubmit(onSubmit)}>
				{name === 'register' &&
					<label className="Form__label">
						<span className='Form__label-text'>Имя</span>
						<input type="name" className="Form__input" {...register('name', {
							required: 'Нужно ввести имя',
							pattern: {
								value: /^[а-яёa-z -]+$/i,
								message: 'Имя должно содержать только латиницу, кириллицу, пробел или дефис'
							},
						})} />
						<span className='Form__input-error'>{errors?.name?.message}</span>
					</label>
				}
				<label className="Form__label">
					<span className='Form__label-text'>E-mail</span>
					<input type="email" className="Form__input" {...register('email', {
						validate: value => isEmail(value) || 'Нужно ввести email',
					})} />
					<span className='Form__input-error'>{errors?.email?.message}</span>
				</label>
				<label className="Form__label">
					<span className='Form__label-text'>Пароль</span>
					<input type="password" className="Form__input" {...register('password', {
						required: 'Нужно ввести пароль'
					})} />
					<span className='Form__input-error'>{errors?.password?.message}</span>
				</label>
				<div className='Form__submit-container'>
					{errorReg && <p className='Form__submit-error'>Произошла ошибка</p>}
					<input type="submit" disabled={(isValid && !isSubmitRegister) ? false : true} className={`${clasNameButton} ${(isValid && !isSubmitRegister) && clasNameButtonValid}`} value={name === 'register' ? 'Зарегистрироваться' : 'Войти'} />
					<p className='Form__question'>
						{name === 'register' ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?'}
						{name === 'register'
							? <Link className='Form__link' to="/signin">Войти</Link>
							: <Link className='Form__link' to="/signup">Регистрация</Link>
						}
					</p>
				</div>
			</form>
		</div>
	)
}
export default Form;