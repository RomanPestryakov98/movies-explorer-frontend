import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import search from '../../images/SearchForm/search.svg';
import { useForm } from "react-hook-form";
import React, { useState } from 'react';

function SearchForm({ name, onSubmit, handleCheckbox, movies, data }) {
	const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit' });
	const [valueSearch, setValueSearch] = useState(JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data'))?.searchWord : '');

	function handleSearch(e) {
		setValueSearch(e.target.value);
	}

	function onHandleSubmit(data) {
		onSubmit(data, name)
	}

	return (
		<section className='SearchForm'>
			<div className='container-movies-card'>
				<div className='SearchForm__wrap'>
					<form className='SearchForm__form' onSubmit={handleSubmit(onHandleSubmit)}>
						<img src={search} alt='Поиск' className='SearchForm__search-icon'></img>
						<div className='SearchForm__search'>
							<input className='SearchForm__input' {...register('movie', {
								required: 'Нужно ввести ключевое слово',
								onChange: handleSearch,
								value: valueSearch
							})} />
							<div className='SearchForm__input-error'>
								{errors?.movie?.message}
							</div>
							<button type='submit' className='SearchForm__button'></button>
						</div>
						<FilterCheckbox register={register} handleCheckbox={handleCheckbox} movies={movies} data={data} />
					</form>
				</div>
			</div>
		</section>
	)
}
export default SearchForm;