import style from './loginForm.module.scss';
import icon1 from './img/icon1.svg';
import icon2 from './img/icon2.svg';
import icon3 from './img/icon3.svg';
import lock from './img/lock.svg';
import { useRef, useState } from 'react';
import Loader from './../../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { authorize, } from '../../../store';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [isLoad, setIsLoad] = useState(false);
    const [isDataValid, setIsDataValid] = useState(false);
    const [isRightAuth, setIsRightAuth] = useState(true);
    const loginRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const expire = useSelector((state) => state.auth.expire)
    const isAuth = useSelector((state) => state.auth.isAuth)

    // useEffect(() => {
    //     if (isAuth) {
    //         navigate('/');
    //         let now = new Date();
    //         setTimeout(() => {
    //             dispatch(logOut())
    //         }, expire + 4000 - now.getTime())  
    //     }
    // }, [isAuth])

    const checkInput = () => {
        let login = loginRef.current.value;
        let password = passwordRef.current.value;
        setIsRightAuth(true);
        setIsDataValid(login.trim() && password.trim())
    }
    
    const submitHandler = async (e) => {
    e.preventDefault();
    if (isDataValid) {
        let dataForm = {
            login: loginRef.current.value,
            password: passwordRef.current.value
        }
        let url = 'https://gateway.scan-interfax.ru/api/v1/account/login';
        setIsLoad(true);
        try {
        let responce = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(dataForm)
        });
        let result = await responce.json();
        if (responce.status === 200) {
            let date = new Date(result.expire);
            dispatch(authorize({
            token: result.accessToken,
            expire: date.getTime()
            }))
            navigate('/');
        } else {
            setIsRightAuth(false);
            setIsDataValid(false);
            passwordRef.current.value = ''; 
        }
        } catch(error) {
        console.log(error)
        } finally {
        setIsLoad(false)
        }
    }
    } 

    return (
    <div className={style.formBlock}>
        <div className={style.logReg}>
            <a href="#" className={style.log}>Войти</a>
            <a href="#" className={style.reg}>Зарегистрироваться</a>
        </div>
        <form name='' className={style.form} onSubmit={submitHandler}>
            <label className={style.label} htmlFor="login">Логин или номер телефона:</label>
            <input onChange={checkInput} className={style.input} ref={loginRef} type="text" id='login' />
            <label className={isRightAuth ? style.label : [style.label, style.labelWrong].join(' ')} htmlFor="password">Пароль:</label>
            <input onChange={checkInput} className={isRightAuth ? style.input : [style.input, style.inputWrong].join(' ')} ref={passwordRef} type="password" id='password' />
            <button type="submit" className={isDataValid ? style.btn : [style.btn, style.btnDisable].join(' ')}>
            {isLoad ?
            <div className={style.loader}>
                <Loader />
            </div>
            :
            'Войти'}
            </button>
        </form>
        <a href="#" className={style.recover}>Восстановить пароль</a>
        <div className={style.altLog}>Войти через:</div>
        <div className={style.altLogBlock}>
            <button className={style.altLogItem}>
            <img src={icon1} alt="google" />
            </button>
            <button className={style.altLogItem}>
            <img src={icon2} alt="facebook" />
            </button>
            <button className={style.altLogItem}>
            <img src={icon3} alt="yandex" />
            </button>
        </div>
        <div className={style.lock}>
            <img src={lock} alt="" />
        </div>
    </div>
  )
}