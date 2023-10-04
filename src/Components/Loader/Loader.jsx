import style from './loader.module.scss';
import loader from './loader.svg'

export default function Loader() {
  return (
    <div className={style.loader}>
        <img src={loader} alt="loader" />
    </div>
  )
}