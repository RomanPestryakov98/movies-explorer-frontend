import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
	return (
		<div className="PageNotFound">
			<h3 className="PageNotFound__title">
				404
			</h3>
			<p className="PageNotFound__text">
				Страница не найдена
			</p>
			<Link className="PageNotFound__button" to="/">Назад</Link>
		</div>
	)
}

export default PageNotFound; 