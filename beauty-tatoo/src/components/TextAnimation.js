import React, { useState, useEffect } from 'react';
import './TextAnimation.css'; // Импорт стилей

const texts = [
  "Добро пожаловать в Beaty&Tattoo",
  "Мы создаем уникальные дизайны",
  "Профессионализм и качество",
];

const TextAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000); // Меняет текст каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-animation">
      <div className="text-animation-content">
        <h2>{texts[currentIndex]}</h2>
      </div>
    </div>
  );
};

export default TextAnimation;