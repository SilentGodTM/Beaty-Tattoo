// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Импорт стилей футера

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Контакты</h3>
          <p>Адрес: ул. Чайковского, 134, Челябинск</p>
          <p>Телефон: +7 (123) 456-7890</p>
          <p>Email: info@beauty-tattoo.ru</p>
          <p>Время работы с 8:00 до 20:00</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Beaty&Tattoo. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer;