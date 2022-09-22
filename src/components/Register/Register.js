import './Register.css';
import Form from '../Form/Form';

function Register({ onRegistration, errorReg }) {
	return (
		<Form name='register' onRegistration={onRegistration} errorReg={errorReg} />
	)
}
export default Register;