import React, { useState, useEffect } from 'react';
import './PersonalAccount.css';

const PersonalAccount = ({ isOpen, onClose, bookings }) => {
  const [currentBookings, setCurrentBookings] = useState([]);
  const [prices, setPrices] = useState({
    'Татуаж': '1000',
    'Татуировка': '2000',
    'Пирсинг': '1500',
    'Удаление': '2500'
  });

  useEffect(() => {
    setCurrentBookings(bookings); // Обновляем данные при изменении пропсов

    // Load prices from localStorage
    const storedPrices = JSON.parse(localStorage.getItem('servicePrices')) || prices;
    setPrices(storedPrices);
  }, [bookings]);

  if (!isOpen) return null;

  // Если нет записей, показываем приветственное сообщение
  const userDetails = currentBookings.length > 0 ? (
    <>
      <h2>Личный кабинет</h2>
      <p>Ваши записи:</p>
      {currentBookings.length === 0 ? (
        <p>У вас нет записей.</p>
      ) : (
        <ul>
          {currentBookings.map((booking, index) => (
            <li key={index} className="booking-item">
              <div className="booking-view">
                <p><strong>Услуга:</strong> {booking.service}</p>
                <p><strong>Цена:</strong> {prices[booking.service] || 'Не указана'}</p> {/* Отображаем цену из localStorage */}
                <p><strong>Дата:</strong> {booking.date}</p>
                <p><strong>Время:</strong> {booking.time}</p>
                <p><strong>Имя:</strong> {booking.firstName}</p>
                <p><strong>Фамилия:</strong> {booking.lastName}</p>
                <p><strong>Телефон:</strong> {booking.phone}</p> {/* Отображаем телефон */}
                <p><strong>Возраст:</strong> {booking.age || 'Не указан'}</p> {/* Отображаем возраст */}
                <p><strong>Комментарий:</strong> {booking.comment || 'Нет комментария'}</p> {/* Отображаем комментарий */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  ) : (
    <p>У вас нет записей.</p>
  );

  return (
    <div className="personal-account-overlay">
      <div className="personal-account-container">
        {userDetails}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default PersonalAccount;
