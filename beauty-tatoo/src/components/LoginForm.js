import React, { useState } from 'react';
import './LoginForm.css'; // Добавьте CSS для стилей формы авторизации

const LoginForm = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  if (!isOpen) return null;

  return (
    <div className="login-form-overlay">
      <div className="login-form-container">
        <h2>Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Логин:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Пароль:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Войти</button>
        </form>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default LoginForm;
