import style from './nav.module.scss';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className={style.nav}>
        <Link to={'/'} className={style.link}>Главная</Link>
        <a className={style.link} href="#">Тарифы</a>
        <a className={style.link} href="#">FAQ</a>
    </nav> 
  )
}

