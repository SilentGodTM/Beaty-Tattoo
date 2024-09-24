// src/components/AdminLogin.js
import React, { useState } from 'react';
import './AdminLogin.css'; // Создайте CSS файл для стилей формы входа

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Здесь замените на реальные логин и пароль
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('adminLoggedIn', 'true');
      onLogin();
    } else {
      alert('Неверное имя пользователя или пароль');
    }
  };

  return (
    <div className="admin-login">
      <h2>Вход в админ-панель</h2>
      <form onSubmit={handleLogin}>
        <label>
          Имя пользователя:
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
    </div>
  );
};

export default AdminLogin;
