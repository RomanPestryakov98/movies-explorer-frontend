import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
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
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';
import MovieApi from '../../utils/MovieApi';
import { handleLikeLocalStorage, compareSavedWithMovies } from '../../utils/utils';

function App() {
	const [currentUser, setCurrentUser] = useState({});
	const [isBuregerOpen, setIsBuregerOpen] = useState(false);
	const [loggedIn, setLoggedIn] = useState(localStorage.getItem('auth') ? true : false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorReg, setErrorReg] = useState(false);
	const [messageUpdateProfile, setMessageUpdateProfile] = useState(false);
	const history = useHistory();
	const [dataSavedMovies, setDataSavedMovies] = useState(localStorage.getItem('dataSaved') ? JSON.parse(localStorage.getItem('dataSaved')) : {});
	const [dataMovies, setDataMovies] = useState(localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {})

	useEffect(() => {
		tokenCheck();
		// eslint-disable-next-line
	}, [loggedIn])

	function checkAuth(err) {
		if (err.statusText === 'Unauthorized') {
			setLoggedIn(false);
			history.push('/')
			console.log('Пользователь не авторизован')
		}
	}

	function tokenCheck() {
		auth.tokenCheck()
			.then(res => {
				setCurrentUser({ name: res.name, email: res.email });
				setLoggedIn(true);
				localStorage.setItem('isAuth', true);
			})
			.catch(err => {
				checkAuth(err);
				setLoggedIn(false);
			})

	}

	function handleCheckbox(isCheck, name, data) {
		if (name === 'saved-movies') {
			localStorage.setItem('dataSaved', JSON.stringify({ searchWord: data.searchWord, checkbox: isCheck, movies: data?.movies || [] }));
			setDataSavedMovies(JSON.parse(localStorage.getItem('dataSaved')));
		}
		else {
			localStorage.setItem('data', JSON.stringify({ searchWord: data.searchWord, checkbox: isCheck, movies: data?.movies || [] }));
			setDataMovies(JSON.parse(localStorage.getItem('data')));
		}
	}

	function onSubmit(data, name) {
		if (name === 'movies') {
			if (dataMovies.movies) {
				localStorage.setItem('data', JSON.stringify({ searchWord: data.searchWord, checkbox: data.checkbox, movies: dataMovies.movies }));
				setDataMovies(JSON.parse(localStorage.getItem('data')));
			}
			else {
				setIsLoading(true);
				Promise.all([MovieApi.getDataMovies(), MainApi.getMovies()])
					.then(res => {
						localStorage.setItem('data', JSON.stringify({
							searchWord: data.searchWord, checkbox: data.checkbox, movies: compareSavedWithMovies(res[0], res[1])
						}))
						setDataMovies(JSON.parse(localStorage.getItem('data')));
					})
					.catch(err => {
						console.log(err);

					})
					.finally(() => {
						setIsLoading(false);
					})
			}
		}
		else {
			localStorage.setItem('dataSaved', JSON.stringify({ searchWord: data.searchWord, checkbox: data.checkbox, movies: dataSavedMovies?.movies || [] }));
			setDataSavedMovies(JSON.parse(localStorage.getItem('dataSaved')));
		}
	}

	function handleLike(movie) {
		const isLiked = dataMovies.movies.some((c) => c.nameRU === movie.nameRU && !c.liked);
		if (isLiked) {
			MainApi.createMovie(movie)
				.then(res => {
					localStorage.setItem('data', JSON.stringify({ searchWord: dataMovies.searchWord, checkbox: dataMovies.checkbox, movies: handleLikeLocalStorage(res) }));
					setDataMovies(JSON.parse(localStorage.getItem('data')));

					const newDataSavedMovies = Array.from(dataSavedMovies.movies);
					newDataSavedMovies.push(res);
					localStorage.setItem('dataSaved', JSON.stringify({ searchWord: dataSavedMovies.searchWord, checkbox: dataSavedMovies.checkbox, movies: newDataSavedMovies }));
					setDataSavedMovies(JSON.parse(localStorage.getItem('dataSaved')));
				})
				.catch(err => {
					checkAuth(err);
				})
		}
		else {
			MainApi.deleteMovie(movie._id)
				.then(res => {
					localStorage.setItem('data', JSON.stringify({ searchWord: dataMovies.searchWord, checkbox: dataMovies.checkbox, movies: handleLikeLocalStorage(res) }));
					setDataMovies(JSON.parse(localStorage.getItem('data')));

					const newDataSavedMovies = [...dataSavedMovies.movies].filter(c => c.nameRU !== res.nameRU)
					localStorage.setItem('dataSaved', JSON.stringify({ searchWord: dataSavedMovies.searchWord, checkbox: dataSavedMovies.checkbox, movies: newDataSavedMovies }));
					setDataSavedMovies(JSON.parse(localStorage.getItem('dataSaved')));
				})
				.catch(err => {
					checkAuth(err);
				})
		}

	}

	function deleteMovieFromSavedMovies(movie) {
		MainApi.deleteMovie(movie._id)
			.then(res => {
				if (localStorage.getItem('data')) {
					localStorage.setItem('data', JSON.stringify({ searchWord: dataMovies.searchWord, checkbox: dataMovies.checkbox, movies: handleLikeLocalStorage(res) }));
					setDataMovies(JSON.parse(localStorage.getItem('data')));
				}

				const newDataSavedMovies = [...dataSavedMovies.movies].filter(c => c.nameRU !== res.nameRU)
				localStorage.setItem('dataSaved', JSON.stringify({ searchWord: dataSavedMovies.searchWord, checkbox: dataSavedMovies.checkbox, movies: newDataSavedMovies }));
				setDataSavedMovies(JSON.parse(localStorage.getItem('dataSaved')));
			})
			.catch(err => {
				console.log(err);
				checkAuth(err);
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

	function signout() {
		MainApi.signout()
			.then(() => {
				setLoggedIn(false);
				localStorage.clear();
				history.push('/');
			})
			.catch(err => {
				console.log(err)
			})
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
			.catch((err) => {
				setErrorReg(true);
				console.log(err)
			})
	}

	function login(data) {
		auth.loginApi(data.email, data.password)
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

	function submitUpdateProfile(data) {
		MainApi.updateProfile(data)
			.then(() => {
				setCurrentUser(data);
				setMessageUpdateProfile(true);
			})
			.catch((err) => {
				console.log(err);
				checkAuth(err);
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
						dataMovies={dataMovies}
						loggedIn={loggedIn}
						isLoading={isLoading}
						onSubmit={onSubmit}
						handleLike={handleLike}
						handleCheckbox={handleCheckbox}
						component={Movies}
					/>

					<ProtectedRoute
						path="/saved-movies"
						loggedIn={loggedIn}
						deleteMovieFromSavedMovies={deleteMovieFromSavedMovies}
						dataSavedMovies={dataSavedMovies}
						handleCheckbox={handleCheckbox}
						setDataSavedMovies={setDataSavedMovies}
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