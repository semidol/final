import style from './login.module.scss';
import bg from './img/bg.svg';
import LoginForm from './LoginForm/LoginForm';

export default function Loginpage() {

  return (
    <main className={style.main}>
      <div className="container">
        <div className={style.wrapper}>
          <h1 className={style.heading}>Для оформления подписки на&#160;тариф, необходимо авторизоваться.</h1>
          <LoginForm />
          <div className={style.bg}>
            <img src={bg} alt="people with key" />
          </div>
        </div>
      </div>
    </main>
  )
}