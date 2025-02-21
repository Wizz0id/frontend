import React, {useState} from 'react';
import axios from "axios";
import './Login.css'; 
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const host = "http://localhost:8080"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправка запроса на авторизацию
      const response = await axios.post(host +"/auth-api", { username, password });

      if (response.status === 200) {
          const { token, roles } = response.data;

          // Сохраняем токен и роли
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("userRoles", JSON.stringify(roles));

          console.log("Авторизация успешна!", response.data);
          console.log("Роли пользователя:", roles);

          // Перенаправление на страницу событий
          window.location.href = "/events";
      }
  } catch (error) {
      if(error.status) {
          const {status, data} = error.response;
          switch (status) {
              case 400 :
                  alert(`${data}`);
                  break;
              case 401:
                  alert(`Неправильный логин`);
                  break;
              case 404:
                  navigate("/404");
                  break;
              case 503:
                  // База данных недоступна
                  alert(data.details || "База данных недоступна. Попробуйте позже.");
                  break;
              case 500:
                  if (data.error === "Database Error") {
                      alert(data.details || "Ошибка базы данных. Попробуйте позже.");
                  } else {
                      alert("Ошибка сервера: " + (data.message || "Попробуйте позже."));
                  }
                  break;
              default:
                  console.error("Неизвестная ошибка:", data.message || error.message);
                  alert("Произошла ошибка. Попробуйте позже.");
          }
      }
      else {
          // Обработка сетевых ошибок
          console.error("Ошибка сети или сервера:", error.message);
          alert("Проблема с соединением. Проверьте интернет и попробуйте позже.");
      }
    }
  }
  return (
    <div className="login-container">
      <h2>Вход в систему</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Логин</label>
          <input 
                    className="login-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength="8"
                    minLength="4"
                    required
                />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input
                    className="login-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength="100"
                    minLength="0"
                    required
                />
        </div>
        <button className="button-loggin" type="submit">Войти</button>
        <p>Первый раз? <Link to="/register">Зарегистрироваться</Link></p>
      </form>
    </div>
  );
}
