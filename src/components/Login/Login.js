import './Login.css';
import Form from '../Form/Form';

function Login({ onLogin, errorReg }) {
	return (
		<Form name='login' onLogin={onLogin} errorReg={errorReg} />
	)
}
export default Login;