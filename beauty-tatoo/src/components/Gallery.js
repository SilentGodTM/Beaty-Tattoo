// src/components/Gallery.js
import React from 'react';
import './Gallery.css'; // Импорт стилей для галереи

// Пример данных для изображений
const tattooImages = [
  require('../assets/tato/tatoo1.jpg'),
  require('../assets/tato/tatoo2.jpg'),
  require('../assets/tato/tatoo3.jpg'),
  require('../assets/tato/tatoo4.jpg'),
  require('../assets/tato/tatoo5.jpg'),
  require('../assets/tato/tatoo6.jpg'),
  require('../assets/tato/tatoo7.jpg'),
  require('../assets/tato/tatoo8.jpg'),
  require('../assets/tato/tatoo9.jpg'),
  // Добавьте больше путей к изображениям
];

const Gallery = () => {
  return (
    <section id="gallery" className="gallery">
      <h2 className="gallery-title">Наши работы</h2>
      <div className="gallery-images">
        {tattooImages.map((src, index) => (
          <img key={index} src={src} alt={`Tattoo ${index + 1}`} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;