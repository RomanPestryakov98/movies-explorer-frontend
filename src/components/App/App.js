import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth.js';
import { useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';
import MovieApi from '../../utils/MovieApi';
import { setDataLocalStorage, handleLikeLocalStorage, compareSavedWithMovies } from '../../utils/utils';

function App() {
	const [currentUser, setCurrentUser] = useState({});
	const [isBuregerOpen, setIsBuregerOpen] = useState(false);
	const [loggedIn, setLoggedIn] = useState(localStorage.getItem('auth') ? true : false);
	const [errorReg, setErrorReg] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMovies, setErrorMovies] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const [messageUpdateProfile, setMessageUpdateProfile] = useState(false);
	const history = useHistory();
	const [savedMovies, setSavedMovies] = useState(localStorage.getItem('dataSaved') ? JSON.parse(localStorage.getItem('dataSaved')) : []);
	const [data, setData] = useState(localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {})

	useEffect(() => {
		tokenCheck();
	}, [loggedIn])

	function tokenCheck() {
		if (localStorage.getItem('auth')) {
			auth.tokenCheck()
				.then(res => {
					setCurrentUser({ name: res.name, email: res.email });
					setLoggedIn(true);
				})
				.catch(err => {
					console.log(err)
				})
		}
	}

	function handleCheckbox(isCheck, name) {
		if (name === 'movies') {
			setDataLocalStorage({ movie: data.searchWord, checkbox: isCheck }, JSON.parse(localStorage.getItem('data'))?.movies || []);
			setData(JSON.parse(localStorage.getItem('data')))
		}
	}

	function onSubmit(data) {

		if (localStorage.getItem('data')) {
			setDataLocalStorage(data, JSON.parse(localStorage.getItem('data')).movies);
			setData(JSON.parse(localStorage.getItem('data')));
		}
		else {
			setNotFound(false);
			setIsLoading(true);
			setErrorMovies(false);
			MovieApi.getDataMovies()
				.then(movies => {
					setDataLocalStorage(data, compareSavedWithMovies(movies, savedMovies));
					setData(JSON.parse(localStorage.getItem('data')));
				})
				.catch((err) => {
					setErrorMovies(true);
					console.log(err);
				})
				.finally(() => {
					setIsLoading(false);
					setNotFound(true);
				})
		}
	}

	function handleLike(movie) {
		const isLiked = data.movies.some((c) => c.nameRU === movie.nameRU && !c.liked);
		if (isLiked) {
			MainApi.createMovie(movie)
				.then((res) => {
					setDataLocalStorage({ movie: data.searchWord, checkbox: data.checkbox }, handleLikeLocalStorage(res));
					setData(JSON.parse(localStorage.getItem('data')));
					const newMoviesSaved = Array.from(savedMovies);
					newMoviesSaved.push(res)
					setSavedMovies(newMoviesSaved);
					localStorage.setItem('dataSaved', JSON.stringify(newMoviesSaved));
				})
				.catch(err => {
					console.log(err);
				})
		}
		else {
			MainApi.deleteMovie(movie._id)
				.then((res) => {
					setDataLocalStorage({ movie: data.searchWord, checkbox: data.checkbox }, handleLikeLocalStorage(res));
					setData(JSON.parse(localStorage.getItem('data')));
					setSavedMovies((state) => state.filter(c => c.nameRU !== movie.nameRU));
					localStorage.setItem('dataSaved', JSON.stringify(savedMovies.filter(c => c.nameRU !== movie.nameRU)));
				})
				.catch(err => {
					console.log(err)
				})
		}
	}

	function deleteMovieFromSavedMovies(movie) {
		MainApi.deleteMovie(movie._id)
			.then((res) => {
				setDataLocalStorage({ movie: data.searchWord, checkbox: data.checkbox }, handleLikeLocalStorage(res));
				setData(JSON.parse(localStorage.getItem('data')));
				setSavedMovies((state) => state.filter(c => c.nameRU !== movie.nameRU));
				localStorage.setItem('dataSaved', JSON.stringify(savedMovies.filter(c => c.nameRu !== movie.nameRU)));
			})
	}

	function signout() {
		MainApi.signout()
			.then(() => {
				setLoggedIn(false);
				localStorage.removeItem('data');
				localStorage.removeItem('dataSaved');
				localStorage.removeItem('auth');
				history.push('/');
			})
			.catch(err => {
				console.log(err)
			})
	}

	function handleBurger() {
		setIsBuregerOpen(!isBuregerOpen);
		if (!isBuregerOpen) {
			document.querySelector('body').classList.add('lock');
		} else {
			document.querySelector('body').classList.remove('lock');
		}
	}

	function registration(data) {
		auth.regApi(data.name, data.email, data.password)
			.then(res => {
				if (res) {
					setLoggedIn(true);
					history.push('/movies')
					setErrorReg(false);
				}
			})
			.catch(() => {
				setErrorReg(true)
			})
	}

	function login(data) {
		auth.loginApi(data.email, data.password)
			.then(res => {
				if (res) {
					setLoggedIn(true);
					history.push('/movies')
					setErrorReg(false);
					localStorage.setItem('auth', 'ok');
				}
			})
			.catch(() => {
				setErrorReg(true)
			})
	}

	function submitUpdateProfile(data) {
		MainApi.updateProfile(data)
			.then(() => {
				setCurrentUser(data);
				setMessageUpdateProfile(true);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setTimeout(() => setMessageUpdateProfile(false), 2000);
			})

	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className={`page ${isBuregerOpen ? 'menu-open' : ''}`}>
				<Header isLoggedIn={loggedIn} onClickBurger={handleBurger} />
				<Switch>
					<Route exact path="/">
						<Main />
					</Route>

					<ProtectedRoute
						path="/movies"
						data={data}
						loggedIn={loggedIn}
						isLoading={isLoading}
						onSubmit={onSubmit}
						errorMovies={errorMovies}
						notFound={notFound}
						handleLike={handleLike}
						handleCheckbox={handleCheckbox}
						component={Movies}
					/>

					<ProtectedRoute
						path="/saved-movies"
						loggedIn={loggedIn}
						deleteMovieFromSavedMovies={deleteMovieFromSavedMovies}
						savedMovies={savedMovies}
						setSavedMovies={setSavedMovies}
						component={SavedMovies}
						onSubmit={onSubmit}
					/>

					<ProtectedRoute
						path="/profile"
						loggedIn={loggedIn}
						component={Profile}
						onSignout={signout}
						messageUpdateProfile={messageUpdateProfile}
						submitUpdateProfile={submitUpdateProfile}
					/>

					<Route path="/signup">
						{loggedIn
							?
							<Redirect to='/movies' />
							:
							<Register errorReg={errorReg} onRegistration={registration} />
						}
					</Route>

					<Route path="/signin">
						{loggedIn
							?
							<Redirect to='/movies' />
							:
							<Login errorReg={errorReg} onLogin={login} />
						}
					</Route>

					<Route path="*">
						<PageNotFound />
					</Route>
				</Switch>
				<Footer />
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;