import React, { Fragment } from 'react';

export default function MainCard() {
  return (
    <Fragment>
      <section className="hero">
        <h1>Обратная связь, которая работает</h1>
        <p>Узнавайте больше о своих преподавателях, лучше адаптируйтесь во время обучения.</p>
        <p>А также оставляйте оценки и комментарии преподавателям, помогайте улучшить образовательный процесс.</p>
        <img src='imgs/background_main.png' className='img-background' alt="Background" />
        <a href="#" className="btn">Оставить отзыв</a>
      </section>

      <section className="features">
        <div className="feature-box">
          <img src="imgs/rate.png" alt="Рейтинг" width="1200" />
          <h3>Оценки преподавателей</h3>
          <p>Выставляйте оценки преподавателям за их работу и помогайте другим студентам выбирать лучших.</p>
        </div>
        <div className="feature-box">
          <img src="imgs/comments.png" alt="Комментарии" width="500" />
          <h3>Комментарии</h3>
          <p>Оставляйте отзывы, делитесь своим мнением о методах преподавания.</p>
        </div>
        <div className="feature-box">
          <img src="imgs/shield.png" alt="Модерация" width="500" />
          <h3>Модерация</h3>
          <p>Все комментарии проходят проверку, чтобы поддерживать честность и объективность.</p>
        </div>
      </section>

      <section className="partners">
        <h2>Наши партнеры</h2>
        <img src="imgs/ssau.jpg" alt="Самарский университет" />
      </section>
    </Fragment>
  );
}


