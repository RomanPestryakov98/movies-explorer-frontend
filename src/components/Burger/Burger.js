import './Burger.css';

function Burger({ onClickBurger }) {
	return (
		<button type="button" className="Burger" onClick={onClickBurger}><span></span></button>
	)
}
export default Burger;