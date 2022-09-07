import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
	return (
		<>
			<SearchForm />
			<MoviesCardList />
		</>
	)
}
export default SavedMovies;