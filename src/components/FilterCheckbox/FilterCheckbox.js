import './FilterCheckbox.css';

function FilterCheckbox() {
	function test(e) {
		console.log(e.target.checked)
	}

	return (
		<label
			className="FilterCheckbox"
		>
			<input
				onClick={test}
				className="FilterCheckbox__invisible-checkbox"
				type="checkbox"
			/>
			<span className="FilterCheckbox__pseudo-checkbox"></span>
			<span className="FilterCheckbox__label-text">Короткометражки</span>
		</label>
	)
}
export default FilterCheckbox;