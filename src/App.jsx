import './App.css';
import React, { Fragment } from 'react';
import Rating from './components/Ratings/Rating';
import AboutUs from './AboutUs/AboutUs';
import Home from './components/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Button from './components/Button/Button';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';
  
  const navigate = useNavigate();
  function handleClick()
    {
      navigate('/login');
    }
  return (
    <Fragment>
      {!isLoginOrRegister && (
        <header className="header">
          <div className="logo">Uni.Con</div>
          <nav>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="rating">Рейтинги</Link></li>
            <li><Link to="about-us">О нас</Link></li>
          </ul>
          </nav>
          <Button className="login-button" buttonClicked={handleClick}>Войти / Зарегистрироваться</Button>
        </header>
      )}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/rating" element={<Rating />}/>
        <Route path="/about-us" element={<AboutUs />}/>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Fragment>
  );
}