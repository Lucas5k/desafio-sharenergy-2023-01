import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginPage } from '../Helpers/Requests';
import styled  from '../Styled/StyledLogin.module.css';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

function Login() {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passType, setPassType] = useState('password');
  const [checked, setChecked] = useState(false);

  const handleSubmit = async () => {
    const statusCode = await loginPage('/login', { username, password });

    if (statusCode === 200) {
      if (checked) {
        localStorage.setItem('USERS', JSON.stringify({ username, checked }));
      }
    }
    return history.push('/home', { from: 'Home' });
  };

  useEffect(() => {
    const getInLocalStorage = async () => {
      const result = await localStorage.getItem('USERS');
      const ischecked = JSON.parse(result);
      if (ischecked.checked) {
        setChecked(true);

        return history.push('/home', { from: 'Home' });
      }
    }
    getInLocalStorage();
  }, [checked]);

  return (
    <div className={ styled.Login__container }>
      <section className={ styled.Login__box }>
        <h1>Sign in</h1>
        <label htmlFor='user-id'>
          <input
            type='text'
            onChange={ ({ target }) => setUsername(target.value) }
            id='user-id'
            placeholder='username'
            value={ username }
          />
        </label>
        <label htmlFor='pass-id'>
          <input
            type={ passType }
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder='password'
            id='pass-id'
            name="password"
            value={ password }
          />
        </label>
        <label htmlFor='check-id'>
          Remember me?
          <input
            type='Checkbox'
            checked={ checked }
            onChange={ () => setChecked(!checked) }
          />
        </label>
        <button
          type='submit'
          onClick={
            () => passType === 'password' ? setPassType('text') : setPassType('password')
          }
        >
          { passType === 'password' ? <FaEye /> : <FaEyeSlash /> }
        </button>
        <button
          type='button'
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </section>
    </div>
  );
};

export default Login;
