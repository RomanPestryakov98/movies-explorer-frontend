import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import search from '../../images/SearchForm/search.svg';
import { useForm } from "react-hook-form";
import React, { useState } from 'react';

function SearchForm({ name, onSubmit, handleCheckbox, data }) {
	const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit' });
	const [valueSearch, setValueSearch] = useState(data?.searchWord ? data.searchWord : '');

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
							<input className='SearchForm__input' {...register('searchWord', {
								required: 'Нужно ввести ключевое слово',
								onChange: handleSearch,
								value: valueSearch
							})} />
							<div className='SearchForm__input-error'>
								{errors?.searchWord?.message}
							</div>
							<button type='submit' className='SearchForm__button'></button>
						</div>
						<FilterCheckbox register={register} handleCheckbox={handleCheckbox} data={data} name={name} />
					</form>
				</div>
			</div>
		</section>
	)
}
export default SearchForm;