import axios from 'axios';
import React, { Fragment, useEffect, useState, useCallback } from 'react';
import Grade from '../Grade/Grade';
import './TeacherCard.css';

const host = "http://localhost:8080";

export default function TeacherCard({ searchQuery }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeachers = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const url = query
        ? `${host}/user-api/teachers?q=${query}`
        : `${host}/user-api/teachers/all`;

      const response = await axios.get(url);
      setTeachers(response.data || []);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error('Превышен лимит запросов. Пожалуйста, попробуйте позже.');
        setError('Превышен лимит запросов. Пожалуйста, попробуйте позже.');
      } else {
        console.error('Ошибка при получении данных:', error);
        setError('Ошибка при получении данных.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers(searchQuery);
  }, [searchQuery, fetchTeachers]);

  return (
    <Fragment>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <section className="teacher-cards">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="teacher-card">
            <img
              src='imgs/default_avatar.jpg'
              alt={`${teacher.name} ${teacher.lastname}`}
              className="teacher-img"
            />
            <h3 className="teacher-name">{teacher.name} {teacher.lastname}</h3>
            <div className="rating">
              <span>★ {teacher.baseRating}</span>
              <span>({teacher.baseRatesCount} reviews)</span>
            </div>
            <Grade teacherId={teacher.id} />
          </div>
        ))}
      </section>
    </Fragment>
  );
}
