import style from './tariff.module.scss'

export default function Tariff({data, isActive}) {
  return (
    <div className={isActive ? [style.tariff, style.active].join(' ') : style.tariff}>
      <div className={style.top}>
        <h3 className={style.name}>{data.name}</h3>
        <p className={style.about}>{data.about}</p>
        <div className={style.img}><img src={data.icon} alt="icon" /></div>
      </div>
      <div className={style.bottom}>
        <div className={style.priceBlock}>
          <div className={style.discount}>{data.discount}</div>
          <div className={style.price}>{data.price}</div>
        </div>
        <p className={style.installment}>{data.installment}</p>
        <h4 className={style.includeHeading}>В тариф входит:</h4>
        <ul className={style.include}>
          {data.include.map((item, i) => <li className={style.includeItem} key={i}>{item}</li>)}
        </ul>
        <div className={style.btnWrapper}>
          {isActive ?
          <button className={style.btnCurrent}>Перейти в личный кабинет</button> :
          <button className={style.btnDif}>Подробнее</button>}
        </div>
        {isActive && <div className={style.current}>Текущий тариф</div>}
      </div>
    </div>
  )
}