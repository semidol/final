import style from './resultpage.module.scss';
import result from './result.svg';
import ResultSlider from './ResultSlider/ResultSlider';
import ResultDoc from './ResultDoc/ResultDoc';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { dataSend, headers } from './dataSend';

export default function Resultpage() {
  const token = useSelector((state) => state.auth.token);
  const startDate = useSelector((state) => state.documents.issueDateInterval.startDate);
  const endDate = useSelector((state) => state.documents.issueDateInterval.endDate);
  const inn = useSelector((state) => state.documents.inn);
  const tonality = useSelector((state) => state.documents.tonality);
  const limit = useSelector((state) => state.documents.limit);
  const [isSliderLoad, setIsSliderLoad] = useState(true);
  const [dataSlide, setDataSlide] = useState(false);
  const countDocs = useRef(0);
  const documents = useRef([]);
  const idArticles = useRef(null);
  const [documentsComps, setDocumentsComps] = useState([]);
  headers.Authorization = `Bearer ${token}`;
  dataSend.issueDateInterval.startDate = startDate;
  dataSend.issueDateInterval.endDate = endDate;
  dataSend.searchContext.targetSearchEntitiesContext.targetSearchEntities = [
    {"inn": inn, 
    "type": "company","sparkId": null,"entityId": null,"maxFullness": true,"inBusinessNews": null}
  ]
  dataSend.searchContext.targetSearchEntitiesContext.tonality = tonality;
  dataSend.limit = limit;

  //запрос статей и их отрисовка
  async function fetchArticle() {
    let limit = idArticles.current.length;
    let itemsSearch;
    if (countDocs.current + 10 < limit) {
      itemsSearch = idArticles.current.slice(countDocs.current, countDocs.current + 10);
      countDocs.current += 10;
    } else if(limit - countDocs.current > 0) {
      itemsSearch = idArticles.current.slice(countDocs.current, limit);
      countDocs.current = +limit;
    }
    
    let ids = {ids: itemsSearch?.map((item) => item.encodedId)}
    let url = 'https://gateway.scan-interfax.ru/api/v1/documents'
			try {
        let responce = await fetch(url, {
					method: 'POST',
					headers: headers,
					body: JSON.stringify(ids)
				})
        let result = await responce.json();
        if (responce.status === 200) {
          result.forEach((item) => {
            if (item.ok) {
              documents.current.push(item.ok)
            }
          })
        }
        
        setDocumentsComps(documents.current.map((item, index) => <ResultDoc key={index} data={item} />))
      } catch(e) {
        console.log(e)
      }
  }

  // Запрос данных для слайдера и его отрисовка
	useEffect(() => {             
		async function fetchData() {
			let url = 'https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms'
			try {
        setIsSliderLoad(true)
        let responce = await fetch(url, {
					method: 'POST',
					headers: headers,
					body: JSON.stringify(dataSend)
				})
			  
        let result = await responce.json();
        if (responce.status === 200) {setDataSlide(result)}
      } catch(e) {
        console.log(e)
      } finally {
        setIsSliderLoad(false)
      }
		}
    fetchData()
	},[])

  // Запрос данных о статьях и отрисовка первых статей
  useEffect(() => {
		async function fetchData() {
			let url = 'https://gateway.scan-interfax.ru/api/v1/objectsearch'
			try {
        let responce = await fetch(url, {
					method: 'POST',
					headers: headers,
					body: JSON.stringify(dataSend)
				})
			  
        let result = await responce.json();
        idArticles.current = result.items;
        fetchArticle()
      } catch(e) {
        console.log(e)
      }
		}
    fetchData()
	},[])

  return (
    <main className={style.main}>
        <section className={style.search}>
            <div className={[style.search__wrapper, 'container'].join(' ')}>
                <h1 className={style.search__heading}>Ищем. Скоро будут результаты</h1>
                <p className={style.search__desc}>Поиск может занять некоторое время, просим сохранять терпение.</p>
                <div className={style.search__img}>
                    <img src={result} alt="девушка с лупой" />
                </div>
            </div>
        </section>
        <section className={style.summary}>
          <div className="container">
            <h2 className={style.summary__heading}>Общая сводка</h2>
            <p className={style.summary__found}>Найдено 4 221 вариантов</p>
            <div className={style.summary__slider}>
              <ResultSlider data={dataSlide} isLoad={isSliderLoad} />
            </div>
          </div>
        </section>
        <section className={style.doc}>
          <div className='container'>
            <div className={style.doc__articles}>
              {documentsComps}
            </div>
            {idArticles.current?.length > countDocs.current && <button onClick={fetchArticle} className={style.doc__btn}>
              Показать больше
            </button>}
          </div>
        </section>
    </main>
  )
}