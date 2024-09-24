import React, { useState, useEffect } from 'react';
import './BookingForm.css';

const BookingForm = ({ isOpen, onClose, onNewBooking, bookings }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [comment, setComment] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [prices, setPrices] = useState({
    'Татуаж': '1000',
    'Татуировка': '2000',
    'Пирсинг': '1500',
    'Удаление': '2500'
  });

  useEffect(() => {
    const storedPrices = JSON.parse(localStorage.getItem('servicePrices')) || prices;
    setPrices(storedPrices);
  }, [prices]);

  const isTimeOccupied = (date, time) => {
    const occupiedTimes = bookings
      .filter(booking => booking.date === date)
      .map(booking => booking.time);

    const intervalMinutes = 60;
    const [startHour, startMinute] = time.split(':').map(Number);
    const startTime = startHour * 60 + startMinute;

    return occupiedTimes.some(occupiedTime => {
      const [occupiedHour, occupiedMinute] = occupiedTime.split(':').map(Number);
      const occupiedTimeInMinutes = occupiedHour * 60 + occupiedMinute;
      return (
        (Math.abs(occupiedTimeInMinutes - startTime) <= intervalMinutes)
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ageNumber = parseInt(age, 10);

    if (!firstName || !lastName || !phone || !date || !time || !price) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    if (isNaN(ageNumber) || ageNumber < 18) {
      setError('Возраст должен быть 18 лет и старше');
      return;
    }

    const [hour] = time.split(':').map(num => parseInt(num, 10));
    if (hour < 8 || hour >= 20) {
      setError('Время должно быть между 08:00 и 20:00');
      return;
    }

    if (isTimeOccupied(date, time)) {
      setError('Выбранное время или его интервал заняты. Выберите другое время.');
      return;
    }

    const newBooking = {
      firstName,
      lastName,
      phone,
      age: ageNumber,
      service,
      date,
      time,
      comment,
      price
    };

    onNewBooking(newBooking);
    onClose();
  };

  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    setService(selectedService);
    setPrice(prices[selectedService] || '');
  };

  if (!isOpen) return null;

  return (
    <div className="booking-form-overlay">
      <div className="booking-form-container">
        <h2>Форма записи</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Имя:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Фамилия:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            Телефон:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label>
            Возраст:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <label>
            Услуга:
            <select
              value={service}
              onChange={handleServiceChange}
            >
              <option value="">Выберите услугу</option>
              {Object.keys(prices).map((serviceName) => (
                <option key={serviceName} value={serviceName}>
                  {serviceName}
                </option>
              ))}
            </select>
          </label>
          <label>
            Цена: {price}
          </label>
          <label>
            Дата:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Время:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
          <label>
            Комментарий:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit">Записаться</button>
        </form>
        <button className="close-button" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default BookingForm;
