import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import SavedMovies from './components/SavedMovies/SavedMovies';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {
	const [isBuregerOpen, setIsBuregerOpen] = useState(false);

	function handleBurger() {
		setIsBuregerOpen(!isBuregerOpen);
		if (!isBuregerOpen) {
			document.querySelector('body').classList.add('lock');
		} else {
			document.querySelector('body').classList.remove('lock');
		}
	}

	return (
		<div className={`page ${isBuregerOpen ? 'menu-open' : ''}`}>
			<Header onClickBurger={handleBurger} />
			<Switch>
				<Route exact path="/">
					<Main />
				</Route>

				<Route path="/movies">
					<Movies />
				</Route>

				<Route path="/saved-movies">
					<SavedMovies />
				</Route>

				<Route path="/signup">
					<Register />
				</Route>

				<Route path="/signin">
					<Login />
				</Route>

				<Route path="/profile">
					<Profile />
				</Route>
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
