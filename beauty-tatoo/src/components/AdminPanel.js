import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ isOpen, onClose, bookings, onDeleteBooking, onUpdateBookings }) => {
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [prices, setPrices] = useState({
    'Татуаж': '1000',
    'Татуировка': '2000',
    'Пирсинг': '1500',
    'Удаление': '2500'
  });
  const [updatedPrices, setUpdatedPrices] = useState(prices);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const updatedOccupiedSlots = bookings.map(booking => ({
      date: booking.date,
      time: booking.time,
      start: getPreviousHour(booking.time),
      end: getNextHour(booking.time)
    }));
    setOccupiedSlots(updatedOccupiedSlots);
  }, [bookings]);

  const getPreviousHour = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    return `${String(hour - 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };

  const getNextHour = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    return `${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };

  const checkAvailability = (date, time) => {
    const occupied = occupiedSlots.some(slot =>
      slot.date === date &&
      (slot.start <= time && slot.end >= time)
    );
    return occupied ? 'Занято' : 'Свободно';
  };

  const handleDelete = (index) => {
    onDeleteBooking(index);
    onClose(); // Закрыть админку после удаления
  };

  const handlePriceChange = (service, value) => {
    setUpdatedPrices(prevPrices => ({
      ...prevPrices,
      [service]: value
    }));
  };

  const handleSave = () => {
    // Сохраняем обновленные цены в localStorage
    localStorage.setItem('servicePrices', JSON.stringify(updatedPrices));
    setPrices(updatedPrices); // Обновляем состояние цен
    setSaveMessage('Информация сохранена!');

    // Обновляем все бронирования с новыми ценами
    const updatedBookings = bookings.map(booking => ({
      ...booking,
      price: updatedPrices[booking.service] || 'Не указана'
    }));
    onUpdateBookings(updatedBookings);

    // Очистка сообщения через 3 секунды
    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="admin-panel-overlay">
      <div className="admin-panel-container">
        <h2>Данные пользователей</h2>
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Телефон</th>
              <th>Возраст</th>
              <th>Выбранная услуга</th>
              <th>Дата сеанса</th>
              <th>Время сеанса</th>
              <th>Статус</th>
              <th>Комментарий</th>
              <th>Цена</th> {/* Отображаем цену */}
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.firstName}</td>
                <td>{booking.lastName}</td>
                <td>{booking.phone}</td>
                <td>{booking.age || 'Не указано'}</td>
                <td>{booking.service}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{checkAvailability(booking.date, booking.time)}</td>
                <td>{booking.comment || 'Нет комментария'}</td>
                <td>{booking.price || 'Не указана'}</td> {/* Отображаем цену */}
                <td>
                  <button onClick={() => handleDelete(index)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Изменение цен на услуги</h3>
        <div className="price-edit-container">
          {Object.keys(updatedPrices).map(service => (
            <div key={service} className="price-edit-item">
              <label>
                {service}:
                <input
                  type="text"
                  value={updatedPrices[service]}
                  onChange={(e) => handlePriceChange(service, e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>

        <button className="save-button" onClick={handleSave}>Сохранить</button>
        {saveMessage && <p className="save-message">{saveMessage}</p>}
        <button className="close-button" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default AdminPanel;
