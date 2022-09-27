import './FilterCheckbox.css';
import React, { useState } from 'react';

function FilterCheckbox({ register, handleCheckbox, data, name }) {
	const [isChecked, setIsChecked] = useState(data?.movies ? data.checkbox : false);

	function handleChange() {
		setIsChecked(!isChecked);
		handleCheckbox(!isChecked, name, data);
	}

	return (
		<label
			className="FilterCheckbox"
		>
			<input
				className="FilterCheckbox__invisible-checkbox"
				type="checkbox"
				checked={isChecked}
				{...register('checkbox', {
					onChange: handleChange,
				})}
			/>
			<span className="FilterCheckbox__pseudo-checkbox"></span>
			<span className="FilterCheckbox__label-text">Короткометражки</span>
		</label>
	)
}
export default FilterCheckbox;