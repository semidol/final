import style from './resultDoc.module.scss';
import { useEffect, useRef } from 'react';
import { correctCount, parseData } from './functions';

export default function ResultDoc({data}) {
	let isGenre = true;
	let genre = '';
	const textRef = useRef(null);
	const imgRef = useRef(null);
	let {inner, img} = parseData(data.content?.markup);
	
	useEffect(() => {
		textRef.current.innerHTML = inner;
		if(img) {
			imgRef.current.innerHTML = '';
			imgRef.current.append(img)
		}
	},[])
	

	switch(true) {
		case data.attributes?.isDigest:
			genre = 'Сводки новостей';
			break;
		case data.attributes?.isTechNews:
			genre = 'Технические новости';
			break;
		case data.attributes?.isAnnouncement:
			genre = 'Анонсы и события';
			break;
		default: isGenre = false;
	}
  return (
    <div className={style.doc}>
			<div className={style.dateSource}>
				<div className={style.date}>
					{data.issueDate?.slice(8,10)}.{data.issueDate?.slice(5,7)}.{data.issueDate?.slice(0,4)}
				</div>
				<div className={style.source}>{data.source?.name}</div>
			</div>
			<a href={data?.url}><h3 className={style.heading}>{data.title?.text}</h3></a>
			{isGenre && <div className={style.genre}>{genre}</div>}
			<div className={style.img} ref={imgRef}></div>
			<p ref={textRef} className={style.text}></p>
			<a href={data?.url}><button className={style.btn}>Читать в источнике</button></a>
			<div className={style.countWords}>{correctCount(data.attributes?.wordCount)}</div>
		</div>
  )
}