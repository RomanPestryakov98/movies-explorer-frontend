import './Register.css';
import Form from '../Form/Form';

function Register({ onRegistration, errorReg, isSubmitRegister }) {
	return (
		<Form name='register' onRegistration={onRegistration} errorReg={errorReg} isSubmitRegister={isSubmitRegister} />
	)
}
export default Register;