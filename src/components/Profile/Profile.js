import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { isEmail } from 'validator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

function Profile({ onSignout, submitUpdateProfile, messageUpdateProfile }) {
	const currentUser = useContext(CurrentUserContext);
	const [buttonVisible, setButtonVisible] = useState(false)
	const [isDirty, setIsDirty] = useState(false)

	const { reset, register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

	useEffect(() => {
		setValue('name', currentUser.name);
		setValue('email', currentUser.email);
		// eslint-disable-next-line
	}, [currentUser])


	function onSubmit(data) {
		submitUpdateProfile(data);
		reset();
		setButtonVisible(false);
		setIsDirty(false);
	}

	function handleRed() {
		setButtonVisible(true);
	}

	function handleSignout() {
		onSignout();
	}

	function handleInput() {
		setIsDirty(true)
	}

	return (
		<section className='Profile'>
			<form action="#" className="Profile__form" noValidate onSubmit={handleSubmit(onSubmit)}>
				<h1 className='Profile__title'>Привет, {currentUser.name}!</h1>
				<div className='Profile__data'>
					<label className="Profile__label">
						<span className="Profile__label-text">Имя</span>
						<span className='Profile__input-error'>{errors?.name?.message}</span>
						{!buttonVisible
							?
							<span className='Profile__currentUser'>{currentUser.name}</span>
							:
							<input
								type="text"
								className='Profile__input'
								{...register('name', {
									required: 'Нужно ввести имя',
									onChange: handleInput,
									pattern: {
										value: /^[а-яёa-z -]+$/i,
										message: 'Имя должно содержать только латиницу, кириллицу, пробел или дефис'
									},
								})}
							/>
						}

					</label>
					<label className="Profile__label">
						<span className="Profile__label-text">E-mail</span>
						<span className='Profile__input-error Profile__input-error_type_bottom'>{errors?.email?.message}</span>
						{!buttonVisible
							?
							<span className='Profile__currentUser'>{currentUser.email}</span>
							:
							<input
								type="email"
								className='Profile__input'
								{...register('email', {
									required: 'Нужно ввести email',
									onChange: handleInput,
									validate: value => {
										if (isEmail(value)) {
											return true
										}
										else if (!isEmail(value)) {
											return 'Нужно ввести корректный email'
										}
									},
								})}
							/>
						}
					</label>
				</div>
				{buttonVisible
					?
					<button type='submit' disabled={isDirty && isValid ? false : true} className={`Profile__submit ${(isValid && isDirty) && 'Profile__submit_valid'}`}>Редактировать</button>
					:
					<div className='Profile__buttons'>
						{messageUpdateProfile && <p className='Profile__message-udpate'>Ваши данные успешно обновленны</p>}
						<button type='button' className='Profile__redaction' onClick={handleRed}>Редактировать</button>
						<Link className='Profile__exit' to="/" onClick={handleSignout}>Выйти из аккаунта</Link>
					</div>
				}
			</form>

		</section>
	)
}
export default Profile;