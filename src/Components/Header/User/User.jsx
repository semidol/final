import { Link } from 'react-router-dom';
import style from './user.module.scss';
import user from './user.png';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../store';

export default function User() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch()
  return (
    isAuth ?
    <div className={style.user}>
      <div className={style.nameOut}>
        <div className={style.name}>Алексей А.</div>
        <button onClick={() => dispatch(logOut())} className={style.out}>Выйти</button>
      </div>
      <div className={style.imgContainer}>
        <img src={user} alt="user" />
      </div>
    </div> :
    <div className={style.auth}>
      <button className={style.reg}>Зарегистрироваться</button>
      <div className={style.line}></div>
      <Link to='/login'><button className={style.log}>Войти</button></Link>
    </div>
  )
}