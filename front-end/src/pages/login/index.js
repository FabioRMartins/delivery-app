import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requestApi from '../../api/index';
import { saveUserOnLS } from '../../helpers/localStorage';
import redirectByRole from '../../helpers/redirectByRole';
import { loginIsDisabled } from '../../helpers/validations';
import './style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidUser, setInvalidUser] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const checkLS = localStorage.getItem('user');
    if (checkLS) {
      JSON.parse(checkLS);
      navigate('/customer/products');
    }
  }, []);
  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };
  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleClick = async () => {
    const callApi = await requestApi({ email, password });
    if (callApi.message === 'Usuário não existe') {
      return setInvalidUser(true);
    }
    saveUserOnLS(callApi);
    redirectByRole(callApi.role, navigate);
  };

  return (
    <div className="login-container">
      <main className="container">
        <h2>
          Login
        </h2>
        <form>
          <div className="input-field">
            <input
              data-testid="common_login__input-email"
              type="email"
              name="email"
              value={ email }
              placeholder="Insira seu email"
              onChange={ handleEmail }
            />
            <div className="underline"> </div>
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              value={ password }
              placeholder="Insira sua senha"
              data-testid="common_login__input-password"
              onChange={ handlePassword }
            />
            <div className="underline"> </div>
          </div>
          <button
            type="button"
            className="submit-button"
            data-testid="common_login__button-login"
            disabled={ loginIsDisabled({ email, password }) }
            onClick={ handleClick }
          >
            Login
          </button>
          <p className="texto">
            Ainda não tem cadastro?
          </p>
          <button
            type="button"
            className="submit-button"
            data-testid="common_login__button-register"
            onClick={ () => navigate('/register') }
          >
            Cadastrar
          </button>
        </form>
        {invalidUser && (
          <span
            data-testid="common_login__element-invalid-email"
            className="invalid_user"
          >
            Email ou senha inválidos
          </span>
        )}
      </main>
    </div>
  );
}
export default Login;
