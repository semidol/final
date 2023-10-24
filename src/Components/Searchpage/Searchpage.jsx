import SearchForm from './SearchForm/SearchForm';
import style from './searchpage.module.scss';
import bg1 from './img/bg1.svg';
import bg2 from './img/bg2.svg';
import bg3 from './img/bg3.svg';

export default function Searchpage() {
  return (
    <main className={style.main}>
        <div className='container'>
            <div className={style.wrapper}>
              <h1 className={style.heading}>Найдите необходимые данные в пару кликов.</h1>
              <p className={style.desc}>Задайте параметры поиска.<br/>Чем больше заполните, тем точнее поиск</p>
              <div className={style.form}>
                  <SearchForm />
              </div>
              <div className={style.bg1}><img src={bg1} alt="document" /></div>
              <div className={style.bg2}><img src={bg2} alt="folder" /></div>
              <div className={style.bg3}><img src={bg3} alt="person and rocket" /></div>
            </div>
        </div>
    </main>
  )
}