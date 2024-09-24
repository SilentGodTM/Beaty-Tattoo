// src/components/FeaturesBlock.js
import React from 'react';
import './FeaturesBlock.css'; // Импортируем CSS файл для второго блока

const features = [
  {
    id: 1,
    icon: '../assets/icon/sketch-icon.png',
    title: 'Индивидуальные эскизы',
    description: 'Наши мастера создают уникальные эскизы татуировок, полностью отражающие вашу индивидуальность и стиль. Мы тщательно прорабатываем каждую деталь, чтобы результат превзошел ожидания.'
  },
  {
    id: 2,
    icon: '../assets/icon/application-icon.png',
    title: 'Профессиональное нанесение',
    description: 'Процесс нанесения татуировки требует высочайшего уровня мастерства. Мы используем только лучшие инструменты и материалы, чтобы гарантировать безопасность и качество.'
  },
  {
    id: 3,
    icon: '../assets/icon/care-icon.png',
    title: 'Уход за татуировкой',
    description: 'После нанесения татуировки мы предоставляем подробные инструкции по уходу, чтобы сохранить ее яркость и четкость на долгие годы.'
  }
];

const FeaturesBlock = () => {
  return (
    <section id="features-block" className="features-block">
      {features.map(feature => (
        <div key={feature.id} className="feature">
          <img src={feature.icon} alt={feature.title} className="feature-icon" />
          <h2 className="feature-title">{feature.title}</h2>
          <p className="feature-description">{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default FeaturesBlock;


