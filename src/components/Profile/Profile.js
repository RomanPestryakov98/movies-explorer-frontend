import './Profile.css';

function Profile() {
	return (
		<section className='Profile'>
			<h1 className='Profile__title'>Привет, Виталий!</h1>
			<div className='Profile__data'>
				<label className="Profile__label">
					<span className="Profile__label-text">Имя</span>
					<input
						type="text"
						name="name"
						value='Виталий'
						className='Profile__input'
						minLength="2"
						maxLength="30"
						required
					/>
				</label>
				<label className="Profile__label">
					<span className="Profile__label-text">E-mail</span>
					<input
						type="text"
						value='pochta@yandex.ru'
						name="E-mail"
						className='Profile__input'
						minLength="2"
						maxLength="30"
						required
					/>
				</label>
			</div>
			<button type='button' className='Profile__redaction'>Редактировать</button>
			<button type='button' className='Profile__exit'>Выйти из аккаунта</button>
		</section>
	)
}
export default Profile;