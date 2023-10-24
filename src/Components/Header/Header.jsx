import { useDispatch, useSelector } from 'react-redux';
import Nav from './Nav/Nav';
import Stats from './Stats/Stats';
import User from './User/User.jsx';
import style from './header.module.scss';
import logo from './logo.png';
import logoWhite from './logo-white.png';
import { useWindowWidth } from '../../hooks';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { logOut } from '../../store';

export default function Header() {
  const body = document.querySelector('body');
  const width = useWindowWidth();
  const isAuth = useSelector((state) => state.auth.isAuth)
  const expire = useSelector((state) => state.auth.expire)
  const [isMenuActive, setIsMenuActive] = useState(false)
  let location = useLocation();
  const dispatch = useDispatch();
  
  function burgerHandler() {
    setIsMenuActive(!isMenuActive)
    body.classList.toggle('active');
  }

  useEffect(() => {
    if(isAuth) {
      let now = new Date();
      setTimeout(() => {
        dispatch(logOut())
      }, expire - now.getTime())
    } 
  },[isAuth])

  useEffect(() => {
    setIsMenuActive(false);
    body.classList.remove('active');
  }, [location])
  
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