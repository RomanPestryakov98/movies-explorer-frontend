import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { isEmail } from 'validator';
import { Link } from 'react-router-dom';

function Profile({ onSignout, submitUpdateProfile, messageUpdateProfile }) {
	const currentUser = useContext(CurrentUserContext);

	const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

	function onSubmit(data) {
		submitUpdateProfile(data);
	}

	function handleSignout() {
		onSignout();
	}

	return (
		<section className='Profile'>
			<form action="#" className="Profile__form" noValidate onSubmit={handleSubmit(onSubmit)}>
				<h1 className='Profile__title'>Привет, {currentUser.name}!</h1>
				<div className='Profile__data'>
					<label className="Profile__label">
						<span className="Profile__label-text">Имя</span>
						<span className='Profile__input-error'>{errors?.name?.message}</span>
						<input
							type="text"
							className='Profile__input'
							{...register('name', {
								value: currentUser.name,
								required: 'Нужно ввести имя',
								pattern: {
									value: /^[а-яёa-z -]+$/i,
									message: 'Имя должно содержать только латиницу, кириллицу, пробел или дефис'
								},
								validate: value => value !== currentUser.name || 'Нужно ввести новое имя',
							})}
						/>
					</label>
					<label className="Profile__label">
						<span className="Profile__label-text">E-mail</span>
						<span className='Profile__input-error Profile__input-error_type_bottom'>{errors?.email?.message}</span>
						<input
							type="email"
							className='Profile__input'
							{...register('email', {
								value: currentUser.email,
								required: 'Нужно ввести email',
								validate: value => {
									if (value !== currentUser.email) {
										if (isEmail(value)) {
											return true
										}
										else if (!isEmail(value)) {
											return 'Нужно ввести корректный email'
										}
									}
									return 'Нужно ввести новый email'
								},
							})}
						/>
					</label>
				</div>
				<div className='Profile__buttons'>
					{messageUpdateProfile && <p className='Profile__message-udpate'>Ваши данные успешно обновленны</p>}
					<input disabled={!isValid} type='submit' className={`Profile__redaction ${isValid && 'Profile__redaction_valid'}`} value='Редактировать' />
					<Link className='Profile__exit' to="/" onClick={handleSignout}>Выйти из аккаунта</Link>
				</div>
			</form>
		</section>
	)
}
export default Profile;