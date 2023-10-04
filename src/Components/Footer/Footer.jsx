import style from './footer.module.scss';
import logo from './logo.png';

export default function Footer() {
  return (
    <footer className={style.footer}>
        <div className='container'>
          <div className={style.wrapper}>
            <div className={style.img}>
              <img src={logo} alt="logo" />
            </div>
            <div className={style.info}>
              <div className={style.infoItem}>г. Москва, Цветной б-р, 40</div>
              <a className={style.infoItem} href="tel:+74957712111">+7 495 771 21 11</a>
              <a className={style.infoItem} href="mailto:info@skan.ru">info@skan.ru</a>
              <div className={style.copyright}>Copyright. 2022</div>
            </div>
          </div>
        </div>
    </footer>
  )
}