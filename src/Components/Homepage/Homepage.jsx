import style from './homepage.module.scss';
import bg from './img/bg.png';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import icon1 from './img/icon1.png';
import icon2 from './img/icon2.png';
import icon3 from './img/icon3.png';
import tarrif1 from './img/tariff1.svg';
import tarrif2 from './img/tariff2.svg';
import tarrif3 from './img/tariff3.svg';
import arrowBack from './img/arrow-back.png';
import arrowNext from './img/arrow-next.png';
import { useWindowWidth } from '../../hooks';
import bg2 from './img/bg2.svg'
import Tariff from './Tariff/Tariff';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const dataTariff = [
  {
    color: '#FFB64F',
    name: 'Beginner',
    about: 'Для небольшого исследования',
    icon: tarrif1,
    discount: '799 ₽',
    price: '1 200 ₽',
    installment: 'или 150 ₽/мес. при рассрочке на 24 мес.',
    include: ['Безлимитная история запросов','Безопасная сделка','Поддержка 24/7']
  }, 
  {
    color: '#7CE3E1',
    name: 'Pro',
    about: 'Для HR и фрилансеров',
    icon: tarrif2,
    discount: '1 299 ₽',
    price: '2 600 ₽',
    installment: 'или 279 ₽/мес. при рассрочке на 24 мес.',
    include: ['Все пункты тарифа Beginner','Экспорт истории','Рекомендации по приоритетам']
  },
  {
    color: '#000',
    name: 'Business',
    about: 'Для корпоративных клиентов',
    icon: tarrif3,
    discount: '2 379 ₽',
    price: '3 700 ₽',
    installment: '',
    include: ['Все пункты тарифа Pro','Безлимитное количество запросов','Приоритетная поддержка']
  }
]

export default function Homepage() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const width = useWindowWidth();
  return (
    <main className={style.main}>
      <section className={style.about}>
        <div className='container'>
          <div className={style.about__wrapper}>
            <h1 className={style.about__heading}>сервис по поиску <br/> публикаций <br/> о компании <br/> по его ИНН</h1>
            <p className={style.about__text}>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
            {isAuth && <Link to='/search'><button className={style.about__btn}>Запросить данные</button></Link>}
            <div className={style.about__img}>
              <img src={bg} alt="bg" />
            </div>
          </div>
        </div>
      </section>
      <section className={style.why}>
        <div className="container">
          <h2 className={style.why__heading}>Почему именно&nbsp;мы</h2>
          <CarouselProvider
            className={style.why__slider}
            naturalSlideWidth={400}
            naturalSlideHeight={width > 767 ? 240 : width > 500 ? 170 : width > 380 ? 300 : 330}
            totalSlides={4}
            visibleSlides={width > 1109 ? 3 : width > 767 ? 2 : 1}
            infinite={true}
          >
            <Slider className={style.why__slides}>
              <Slide className={style.why__slide} innerClassName={style.why__innerSlide} index={0}>
                <img src={icon1} alt="icon1" />
                Высокая и оперативная скорость обработки заявки
              </Slide>
              <Slide className={style.why__slide} innerClassName={style.why__innerSlide} index={1}>
                <img src={icon2} alt="icon2" />
                Огромная комплексная база данных, обеспечивающая объективный ответ на запрос
              </Slide>
              <Slide className={style.why__slide} innerClassName={style.why__innerSlide} index={2}>
                <img src={icon3} alt="icon3" />
                Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству
              </Slide>
              <Slide className={style.why__slide} innerClassName={style.why__innerSlide} index={3}>
                <img src={icon1} alt="icon1" />
                Огромная комплексная база данных, обеспечивающая объективный ответ на запрос
              </Slide>
            </Slider>
            <ButtonBack className={style.why__back}>
              <img src={arrowBack} alt="back" />
            </ButtonBack>
            <ButtonNext className={style.why__next}>
              <img src={arrowNext} alt="next" />
            </ButtonNext>
          </CarouselProvider>      
        </div>
        <div className={style.why__bg}>
            <img src={bg2} alt="bg2" />
          </div>
      </section>
      <section className={style.tariff}>
        <div className='container'>
          <h2 className={style.tariff__heading}>наши тарифы</h2>
          <div className={style.tariff__tariffs}>
            <Tariff data={dataTariff[0]}  isActive={isAuth}/>
            <Tariff data={dataTariff[1]}  isActive={false}/>
            <Tariff data={dataTariff[2]}  isActive={false}/>
          </div>
        </div>
      </section>
    </main> 
  )
}