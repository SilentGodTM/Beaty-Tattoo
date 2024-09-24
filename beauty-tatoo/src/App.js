import React, { useState, useEffect } from 'react';
import './App.css';
import tattooIcon from './assets/images/machine.png';
import FeaturesBlock from './components/FeaturesBlock'; 
import TextAnimation from './components/TextAnimation'; 
import Gallery from './components/Gallery'; 
import Footer from './components/Footer'; 
import BookingForm from './components/BookingForm'; 
import AdminPanel from './components/AdminPanel'; 
import LoginForm from './components/LoginForm'; 
import PersonalAccount from './components/PersonalAccount'; 

function App() {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isPersonalAccountOpen, setIsPersonalAccountOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookingData')) || [];
    setBookings(storedBookings);

    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(adminLoggedIn);
  }, []);

  const openBookingForm = () => setIsBookingFormOpen(true);
  const closeBookingForm = () => setIsBookingFormOpen(false);

  const openAdminPanel = () => {
    setBookings(JSON.parse(localStorage.getItem('bookingData')) || []);
    setIsAdminPanelOpen(true);
  };
  const closeAdminPanel = () => setIsAdminPanelOpen(false);

  const openPersonalAccount = () => setIsPersonalAccountOpen(true);
  const closePersonalAccount = () => setIsPersonalAccountOpen(false);

  const handleNewBooking = (newBooking) => {
    const existingBookings = JSON.parse(localStorage.getItem('bookingData')) || [];
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const handleDeleteBooking = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const handleUpdateBooking = (updatedBooking) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    );
    localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('adminLoggedIn', 'true');
      setIsLoggedIn(true);
      setIsLoginFormOpen(false);
    } else {
      alert('Неверный логин или пароль');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
  };

  const handleUpdateBookings = (updatedBookings) => {
    localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const scrollToFeaturesBlock = () => {
    const featuresBlock = document.getElementById('features-block');
    if (featuresBlock) {
      featuresBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGalleryBlock = () => {
    const galleryBlock = document.getElementById('gallery');
    if (galleryBlock) {
      galleryBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFooter = () => {
    const footerBlock = document.getElementById('footer');
    if (footerBlock) {
      footerBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <div className="logo">
            <img src={tattooIcon} alt="Tattoo Icon" />
            <h1>Beaty&Tattoo</h1>
          </div>
          <nav className="nav-menu">
            <ul>
              <li><button onClick={scrollToFeaturesBlock}>О нас</button></li>
              <li><button onClick={scrollToGalleryBlock}>Наши работы</button></li>
              <li><button onClick={scrollToFooter}>Контакты</button></li>
              <li><button onClick={openBookingForm}>Запись</button></li>
              <li><button onClick={openPersonalAccount}>Личный кабинет</button></li>
              {isLoggedIn ? (
                <>
                  <li><button onClick={openAdminPanel}>Админка</button></li>
                  <li><button onClick={handleLogout}>Выйти из админки</button></li>
                </>
              ) : (
                <li><button onClick={() => setIsLoginFormOpen(true)}>Войти</button></li>
              )}
            </ul>
          </nav>
        </div>
        <div className="welcome-message">
          <TextAnimation />
        </div>
      </header>
      <main>
        <FeaturesBlock id="features-block" />
        <Gallery id="gallery" />
        <Footer id="footer" />
      </main>
      <BookingForm 
        isOpen={isBookingFormOpen} 
        onClose={closeBookingForm} 
        onNewBooking={handleNewBooking} 
        bookings={bookings} 
      />
      <AdminPanel 
        isOpen={isAdminPanelOpen} 
        onClose={closeAdminPanel} 
        bookings={bookings} 
        onDeleteBooking={handleDeleteBooking}
        onUpdateBookings={handleUpdateBookings}
      />
      <PersonalAccount 
        isOpen={isPersonalAccountOpen} 
        onClose={closePersonalAccount} 
        bookings={bookings} 
      />
      <LoginForm 
        isOpen={isLoginFormOpen} 
        onClose={() => setIsLoginFormOpen(false)} 
        onLogin={handleLogin} 
      />
    </div>
  );
}

export default App;
