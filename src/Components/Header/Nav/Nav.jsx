import style from './nav.module.scss';

export default function Nav() {
  return (
    <nav className={style.nav}>
        <a className={style.link} href="#">Главная</a>
        <a className={style.link} href="#">Тарифы</a>
        <a className={style.link} href="#">FAQ</a>
    </nav> 
  )
}

