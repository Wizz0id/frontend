import React, { useState } from 'react';
import './Rating.css';
import TeacherCard from '../../components/TeacherCard/TeacherCard';

export default function Rating() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <header>
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск преподавателей..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </header>
      <main>
        <TeacherCard searchQuery={searchQuery} />
      </main>
    </div>
  );
}
