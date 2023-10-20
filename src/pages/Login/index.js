import React, { useEffect, useState } from 'react';
import validator from 'validator';
import styles from './index.module.css';
import logo from '../../images/logo Recipes App.png';
import tomatoes from '../../images/tomate.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const MIN_LENGTH = 6;
    const isEmailValid = validator.isEmail(email);
    const isPasswordValid = password.length > MIN_LENGTH;
    setButtonDisabled(!(isEmailValid && isPasswordValid));
  }, [email, password]);

  function renderInputs() { // eslint purposes
    return (
      <>
        <div className="form-group">
          <label htmlFor="inputEmail" className={ styles.label }>
            Email address
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="inputEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              data-testid="email-input"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className={ styles.label }>
            Password
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              data-testid="password-input"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          data-testid="login-submit-btn"
          disabled={ buttonDisabled }
        >
          Submit
        </button>
      </>
    );
  }

  return (
    <div className={ styles.LoginContainer }>
      <div className={ styles.LogoContainer }>
        <div className={ styles.logoDiv }>
          <img src={ logo } alt="recipes logo" />
        </div>
        <div className={ styles.vegetablesDiv }>
          <img src={ tomatoes } alt="vegetables" />
        </div>
      </div>
      <div className={ styles.LoginForm }>
        <form>
          { renderInputs() }
        </form>
      </div>
    </div>
  );
}

export default Login;
