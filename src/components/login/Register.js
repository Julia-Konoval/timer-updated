import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import loginImg from './login.svg';
import './style.scss';

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    return () => {
      firstNameRef.current = '';
      lastNameRef.current = '';
      emailRef.current = '';
      passwordRef.current = '';
    };
  }, []);

  async function handleSubmit(e) {
    try {
      setError('');
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value
      );

      history.push('/');
    } catch (e) {
      console.log(e);
      setError('Failed to create an account');
    }
  }
  return (
    <div className="base-container">
      <div className="header register">Register</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="login" />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              name="firstname"
              placeholder="firstname"
              ref={firstNameRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              name="lastname"
              placeholder="lastname"
              ref={lastNameRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="email"
              ref={emailRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              placeholder="password"
              ref={passwordRef}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
