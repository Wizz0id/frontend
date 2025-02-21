import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Grade.css'; // Убедитесь, что этот файл CSS подключен

const host = "http://localhost:8080"

const Grade = ({ teacherId }) => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [grades, setGrades] = useState({
    loyaltyGrade: 0,
    demandingGrade: 0,
    materialPresentationGrade: 0,
    senseOfHumorGrade: 0,
    easeOfPassingMlt: 0,
    generalImpressionMlt: 0,
  });
  const [comment, setComment] = useState('');

  const isAuthenticated = () => {
    return true; //!!localStorage.getItem('authToken');
  };

  const openModal = () => {
    if (isAuthenticated()) {
      setIsFlipped(true);
    } else {
      navigate('/login');
    }
  };

  const closeModal = () => {
    setIsFlipped(false);
  };

  const handleGradeChange = (event) => {
    const { name, value } = event.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [name]: value,
    }));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId'); // Предполагается, что user_id хранится в localStorage
    try {
      const response = await axios.post(
        `${host}/rating`,
        {
          user_id: userId,
          teacher_id: teacherId,
          ...grades,
          comment: comment || null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      console.log('Отзыв успешно отправлен:', response.data);
      closeModal();
    } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
    }
  };

  return (
    <div>
      <button className="small-button" onClick={openModal}>Оставить отзыв</button>
      <div className={`modal ${isFlipped ? 'open' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Оставить отзыв</h2>
          <form>
            <label>
              Лояльность:
              <input
                type="number"
                name="loyaltyGrade"
                value={grades.loyaltyGrade}
                onChange={handleGradeChange}
              />
            </label>
            <label>
              Требовательность:
              <input
                type="number"
                name="demandingGrade"
                value={grades.demandingGrade}
                onChange={handleGradeChange}
              />
            </label>
            <label>
              Представление материала:
              <input
                type="number"
                name="materialPresentationGrade"
                value={grades.materialPresentationGrade}
                onChange={handleGradeChange}
              />
            </label>
            <label>
              Чувство юмора:
              <input
                type="number"
                name="senseOfHumorGrade"
                value={grades.senseOfHumorGrade}
                onChange={handleGradeChange}
              />
            </label>
            <label>
              Легкость сдачи МЛТ:
              <input
                type="number"
                name="easeOfPassingMlt"
                value={grades.easeOfPassingMlt}
                onChange={handleGradeChange}
              />
            </label>
            <label>
              Общее впечатление:
              <input
                type="number"
                name="generalImpressionMlt"
                value={grades.generalImpressionMlt}
                onChange={handleGradeChange}
              />
            </label>
            <label>
              Комментарий:
              <textarea
                value={comment}
                onChange={handleCommentChange}
              />
            </label>
            <button type="button" onClick={handleSubmit}>
              Отправить отзыв
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Grade;

//<Button className="learn-more-button">Learn More</Button>