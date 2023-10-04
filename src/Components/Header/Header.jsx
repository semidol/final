import { useSelector } from 'react-redux';
import Nav from './Nav/Nav';
import Stats from './Stats/Stats';
import User from './User/User.jsx';
import style from './header.module.scss';
import logo from './logo.png';
import logoWhite from './logo-white.png';
import { useWindowWidth } from '../../hooks';
import { useState } from 'react';

export default function Header() {
  const body = document.querySelector('body');
  const width = useWindowWidth();
  const [isMenuActive, setIsMenuActive] = useState(false)
  
  function burgerHandler() {
    setIsMenuActive(!isMenuActive)
    body.classList.toggle('active');
  }

  return (
    <header className={style.header}>
        <div className='container'>
            <div className={style.wrapper}>
                <div className={style.logoContainer}>
                  <img src={logo} alt="logo" />
                </div>
                {width > 767 ?
                <div className={style.navUser}>
                    <Nav />
                    <Stats />
                    <User />
                </div> :
                <div>
                  <Stats />
                  <div className={isMenuActive ? [style.navUser, style.active].join(' ') : style.navUser}>
                    <div className={style.whiteLogoContainer}>
                      <img src={logoWhite} alt="logo" />
                    </div>
                    <Nav />
                    <User />
                  </div>
                </div>}
                <div className={style.burger} onClick={burgerHandler}>
                  <span className={isMenuActive ? [style.burgerLine, style.active].join(' ') : style.burgerLine}></span>
                </div>
            </div>
        </div>
    </header>
  )
}