import React from 'react';
import './AboutUs.css'; // Убедитесь, что этот файл CSS подключен

export default function About() {
  return (
    <div className="about-container">
      <h1>О нас</h1>
      <p>
        Добро пожаловать на наш сайт, созданный специально для студентов и преподавателей университета!
      </p>
      <p>
        Наша миссия — предоставить платформу, где каждый студент может выразить своё мнение и оценить работу преподавателей. Мы верим, что обратная связь — это ключ к улучшению качества образования и взаимопонимания между студентами и преподавателями.
      </p>
      <h2>Что мы предлагаем:</h2>
      <ul className="offers-list">
        <li> Система оценок: Удобная и интуитивно понятная система оценок, позволяющая студентам оставлять отзывы и ставить оценки преподавателям.</li>
        <li> Модерация: Все отзывы проходят через систему модерации, чтобы обеспечить честность и корректность оставленных комментариев.</li>
        <li> Прозрачность: Мы стремимся к максимальной прозрачности, чтобы каждый студент мог увидеть реальные отзывы и оценки.</li>
        <li> Присоединяйтесь к нашему сообществу и помогите сделать образовательный процесс ещё лучше!</li>
      </ul>
      <h2>Почему это важно?</h2>
      <p>
        Ваш голос имеет значение! Каждый отзыв помогает преподавателям улучшать свои методы и подходы, а студентам — делать осознанный выбор. Вместе мы можем создать более качественное и вдохновляющее образовательное пространство.
      </p>
      <p>
        Присоединяйтесь к нашему сообществу и помогите сделать образовательный процесс ещё лучше! Ваше мнение может изменить всё!
      </p>
      <img src="imgs/scan.png" alt="Scan" className="scan-image" />
    </div>
  );
}
