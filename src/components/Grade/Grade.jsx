import React, { useState } from 'react';
import axios from 'axios';
import Button from '../Button/Button';
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
        `${host}/grade-api/new`,
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
    <div className="grade">
      <button className="button-55" onClick={openModal}>Оставить отзыв</button>
      <div className={`modal ${isFlipped ? 'open' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Оставить отзыв</h2>
          <form>
            <table className="grade-table">
              <tbody>
                <tr>
                  <td><label>Лояльность:</label></td>
                  <td>
                    <input
                      type="number"
                      name="loyaltyGrade"
                      min="1"
                      max="10"
                      value={grades.loyaltyGrade}
                      onChange={handleGradeChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td><label>Требовательность:</label></td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      name="demandingGrade"
                      value={grades.demandingGrade}
                      onChange={handleGradeChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td><label>Представление материала:</label></td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      name="materialPresentationGrade"
                      value={grades.materialPresentationGrade}
                      onChange={handleGradeChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td><label>Чувство юмора:</label></td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      name="senseOfHumorGrade"
                      value={grades.senseOfHumorGrade}
                      onChange={handleGradeChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td><label>Легкость сдачи:</label></td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      name="easeOfPassingMlt"
                      value={grades.easeOfPassingMlt}
                      onChange={handleGradeChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td><label>Общее впечатление:</label></td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      name="generalImpressionMlt"
                      value={grades.generalImpressionMlt}
                      onChange={handleGradeChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="comment-group">
              <label>Комментарий:</label>
              <textarea
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
            <Button className="button-55" buttonClicked={handleSubmit}>Отправить отзыв</Button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Grade;