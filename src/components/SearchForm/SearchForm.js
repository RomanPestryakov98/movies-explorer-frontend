import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import search from '../../images/SearchForm/search.svg';

function SearchForm() {
	return (
		<section className='SearchForm'>
			<div className='container-movies-card'>
				<div className='SearchForm__wrap'>
					<form className='SearchForm__form'>
						<img src={search} alt='Поиск' className='SearchForm__search-icon'></img>
						<div className='SearchForm__search'>
							<input className='SearchForm__input' placeholder='Фильм' required></input>
							<button type='submit' className='SearchForm__button'></button>
						</div>
						<FilterCheckbox />
					</form>
				</div>
			</div>
		</section>
	)
}
export default SearchForm;