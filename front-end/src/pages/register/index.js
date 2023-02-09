import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterError from '../../components/registerError';
import { INITIAL_NEW_USER } from '../../helpers/initialStates';
import isNewUserValid from '../../helpers/isNewUserValid';
import responseStatus from '../../helpers/responseStatus';
import { saveUserOnLS } from '../../helpers/localStorage';
import redirectByRole from '../../helpers/redirectByRole';
import './style.css';
import createUser from '../../api/createUser';

function Register() {
  const [newUser, setNewUser] = useState(INITIAL_NEW_USER);
  const [serverResponse, setServerResponse] = useState({});
  const [showError, setShowError] = useState(false);
  const [unableToRegister, setUnableToRegister] = useState(true);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setShowError(false);
    setNewUser((prevNewUser) => {
      setUnableToRegister(!isNewUserValid({
        ...prevNewUser,
        [name]: value,
      }));
      return {
        ...prevNewUser,
        [name]: value,
      };
    });
  };

  const sendToServer = async (event) => {
    event.preventDefault();
    try {
      const res = await createUser(newUser, 'customer');
      console.log(res);
      setServerResponse(res.data);
      if (res.status === responseStatus.created) {
        saveUserOnLS(res.data);
        redirectByRole(res.data.role, navigate);
      }
    } catch ({ response: { data: { message } } }) {
      setServerResponse({ message });
      setShowError(true);
    }
  };

  return (
    <div className="register_container">
      <main className="register_main_container">
        <h2>Cadastro</h2>
        <form onSubmit={ sendToServer }>
          <div className="input_field_register">
            <input
              type="text"
              name="name"
              value={ newUser.name }
              placeholder="Nome do usuário"
              data-testid="common_register__input-name"
              onChange={ handleChange }
            />
            <div className="underline"> </div>

          </div>
          <div className="input_field_register">
            <input
              type="email"
              name="email"
              value={ newUser.email }
              placeholder="exemplo@exemplo.com"
              data-testid="common_register__input-email"
              onChange={ handleChange }
            />
            <div className="underline"> </div>
          </div>
          <div className="input_field_register">
            <input
              type="password"
              name="password"
              value={ newUser.password }
              placeholder="Crie uma senha"
              data-testid="common_register__input-password"
              onChange={ handleChange }
            />
            <div className="underline"> </div>

          </div>
          <button
            className="submit_button_register"
            type="submit"
            data-testid="common_register__button-register"
            disabled={ unableToRegister }
          >
            CADASTRAR
          </button>
          <span className="register_error_message">
            {
              showError && <RegisterError message={ serverResponse.message } />
            }
          </span>
        </form>
      </main>
    </div>
  );
}

export default Register;
