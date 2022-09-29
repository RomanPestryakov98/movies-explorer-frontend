import React from 'react';
import { useHistory } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
	const history = useHistory();

	function back() {
		history.goBack();
	}

	return (
		<div className="PageNotFound">
			<h3 className="PageNotFound__title">
				404
			</h3>
			<p className="PageNotFound__text">
				Страница не найдена
			</p>
			<button type='button' className="PageNotFound__button" onClick={back}>Назад</button>
		</div>
	)
}

export default PageNotFound; 