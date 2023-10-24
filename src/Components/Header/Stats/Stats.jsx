import { useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import style from './stats.module.scss';
import { useEffect, useState } from 'react';

export default function Stats() {
  const [stats, setStats] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = useSelector((state) => state.auth.token);

  useEffect(()  => {
    let url = 'https://gateway.scan-interfax.ru/api/v1/account/info';
    let fetchData = async () => {
      setIsLoad(true);
      try {
        let responce = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        let result = await responce.json();
        setStats({
          limit: result.eventFiltersInfo.companyLimit,
          used: result.eventFiltersInfo.usedCompanyCount
        });
      } catch(error) {
        console.log(error)
      } finally {
        setIsLoad(false)
      }
    }
    if (isAuth) {
      fetchData()
    }
  },[token])

  return (
    <div>
      {isAuth && <div className={false ? style.stats : [style.stats, style.load].join(' ')}>
        {!isLoad ? 
        <ul className={style.list}>
          <li className={style.item}>
            Использовано компаний
            <span className={style.used}>{stats.used}</span>
          </li>
          <li className={style.item}>
            Лимит по компаниям
            <span className={style.limit}>{stats.limit}</span>
          </li>
        </ul>
        :
        <div className={style.loader}><Loader /></div>}
      </div>}
    </div>
  )
}
