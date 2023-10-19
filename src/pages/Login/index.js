import React from "react";
import styles from './index.module.css';
import logo from '../../images/logo Recipes App.png';
import tomatos from '../../images/tomate.png';

function Login() {
    return (
        <div className={styles.LoginContainer}>
            <div className={styles.LogoContainer}>
                <div className={styles.logoDiv}>
                    <img src={logo} alt='recipes logo'/>
                </div>
                <div className={styles.vegetablesDiv}>
                    <img src={tomatos} />
                </div>
            </div>
            <div className={styles.LoginForm}>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" data-testid="email-input" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" data-testid="password-input"/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" data-testid="login-submit-btn">Submit</button>
                    </form>
            </div>
        </div>
    )
}

export default Login;