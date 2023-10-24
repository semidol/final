import style from './searchForm.module.scss';
import arrow from './arrow.svg';
import { Calendar } from 'primereact/calendar';
import { useState } from 'react';
import { useRef } from 'react';
import { validateCountDoc, validateDate, validateInn } from './functions';
import { useDispatch } from 'react-redux';
import { setDocs } from '../../../store';
import { useNavigate } from 'react-router-dom';

export default function SearchForm() {
  const [isFilled, setIsFilled] = useState(false);
  const [isRightInn, setIsRightInn] = useState(true);
  const [isRightCount, setIsRightCount] = useState(true);
  const [isRightDate, setIsRightDate] = useState(true);
  const innRef = useRef(null);
  const countDocRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const tonalityRef = useRef(null)
  const inputs = [innRef,countDocRef,startRef,endRef];
  const dispatch = useDispatch();
  const navigate = useNavigate()

  function checkInputs() {
    let result = true;
    function setFalse(setIsRight, arrayOfRef) {
      arrayOfRef.forEach(elem => elem.current.value = '')
      setIsFilled(false);
      setIsRight(false);
      result = false;
    }

    if (!validateInn(innRef.current.value)) {
      setFalse(setIsRightInn, [innRef]);
    }
    if (!validateCountDoc(countDocRef.current.value)) {
      setFalse(setIsRightCount, [countDocRef]);
    }
    if (!validateDate(new Date(startRef.current.value), new Date(endRef.current.value))) {
      setFalse(setIsRightDate, [startRef, endRef])
    }

    return result
  }

  function inputHandler(setRight) {
    setRight(true);
    if (inputs.reduce((countFilled,current) => current.current.value.trim() ? countFilled + 1 : 0, 0) === inputs.length) {
      setIsFilled(true)
    }
  }
  
  function formHandler(e) {
    e.preventDefault();
    if (isFilled) {
      if (checkInputs()) {
        let payload = {
          issueDateInterval: {
            startDate: startRef.current.value,
            endDate: endRef.current.value,
          },
          inn: innRef.current.value,
          tonality: tonalityRef.current.value,
          limit: countDocRef.current.value,
        }
        
        dispatch(setDocs(payload));
        navigate('/result')
      }
    }
  }

  return (
    <form onSubmit={formHandler} className={style.form}>
      <div className={style.left}>
        <div className={isRightInn ? undefined : style.wrongInput}>
          <label className={[style.required, style.left__label].join(' ')} htmlFor="1">ИНН компании</label>
          <input className={style.left__input} onChange={() => inputHandler(setIsRightInn)} ref={innRef} placeholder='10 цифр' id='1' type="text" />
        </div>
        <label className={style.left__label} htmlFor="2">Тональность</label>
        <div className={style.left__selectWrap}>
          <select className={style.left__select} ref={tonalityRef} name="" id="2">
            <option value={'any'}>Любая</option>
            <option value={'positive'}>Позитивная</option>
            <option value={'negative'}>Негативная</option>
          </select>
          <img className={style.left__selectArrow} src={arrow} alt="стрелка" />
        </div>
        <div className={isRightCount ? undefined : style.wrongInput}>
          <label className={[style.required, style.left__label].join(' ')} id='3' htmlFor="">Количество документов в выдаче</label>
          <input className={style.left__input} onChange={() => inputHandler(setIsRightCount)} ref={countDocRef} placeholder='От 1 до 1000' id='3' type="text" />
        </div>
        <label className={[style.required, style.left__label].join(' ')} htmlFor="">Диапазон поиска</label>
        <div className={isRightDate ? style.left__range : [style.left__range, style.wrongInput].join(' ')}>
          <div className={style.left__rangeWrap}>
            <img className={style.left__rangeArrow} src={arrow} alt="" />
            <Calendar dateFormat='yy/mm/dd' placeholder='Дата начала' onHide={() => inputHandler(setIsRightDate)} inputRef={startRef} className={style.left__rangeSelect} />
          </div>
          <div className={style.left__rangeWrap}>
            <img className={style.left__rangeArrow} src={arrow} alt="" />
            <Calendar dateFormat='yy/mm/dd' placeholder='Дата конца' onHide={() => inputHandler(setIsRightDate)} inputRef={endRef} className={style.left__rangeSelect} />
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.right__item}>
          <input className={style.right__input} id='4' defaultChecked type='checkbox' />
          <label className={style.right__label} htmlFor="4">Признак максимальной полноты</label>
        </div>
        <div className={style.right__item}>
          <input className={style.right__input} id='5' defaultChecked type='checkbox' />
          <label className={style.right__label} htmlFor="5">Упоминания в бизнес-контексте</label>
        </div>
        <div className={style.right__item}>
          <input className={style.right__input} id='6' defaultChecked type='checkbox' />
          <label className={style.right__label} htmlFor="6">Главная роль в публикации</label>
        </div>
        <div className={style.right__item}>
          <input className={style.right__input} id='7' type='checkbox' />
          <label className={style.right__label} htmlFor="7">Публикации только с риск-факторами</label>
        </div>
        <div className={style.right__item}>
          <input className={style.right__input} id='8' type='checkbox' />
          <label className={style.right__label} htmlFor="8">Включать технические новости рынков</label>
        </div>
        <div className={style.right__item}>
          <input className={style.right__input} id='9' defaultChecked type='checkbox' />
          <label className={style.right__label} htmlFor="9">Включать анонсы и календари</label>
        </div>
        <div className={style.right__item}>
          <input className={style.right__input} id='10' type='checkbox' />
          <label className={style.right__label} htmlFor="10">Включать сводки новостей</label>
        </div>
      </div>
      <div className={style.bottom}>
        <button type='submit' className={isFilled ? style.bottom__btn : [style.bottom__btn, style.disable].join(' ')}>Поиск</button>
        <div className={style.bottom__required}>* Обязательные к заполнению поля</div>
      </div>
    </form>
  )
}