import React from 'react';
import { Link } from 'react-router-dom'
import RefLogo  from '../styles/assets/rr-logo.png'
import '../styles/main.css'

function Main() {
    return (
      <div className="main">
        <div className="wrapper">
          <div className="left">
            <div className="items-wrapper">
              <div className="item">
                <span className="icon">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </span>
                <span className="label">Следите за своими интересами.</span>
              </div>
              <div className="item">
                <span className="icon">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>
                <span className="label">Послушайте, о чем говорят люди.</span>
              </div>
              <div className="item">
                <span className="icon">
                  <i className="fa fa-comment" aria-hidden="true"></i>
                </span>
                <span className="label">Присоединиться к разговору.</span>
              </div>
            </div>
          </div>
  
          <div className="center">
            <Link to="/main">
              <img src={RefLogo} alt="logo" className="main-logo" />
            </Link>
            <h1>
             Посмотрите, что происходит в
              <br />
              мире прямо сейчас
            </h1>
            <Link to="/signup" className="btn-sign-up">Регистрация</Link>
            <Link to="/login" className="btn-login">Вход</Link>
          </div>
        </div>
      </div>
    )
  }
  
export default Main