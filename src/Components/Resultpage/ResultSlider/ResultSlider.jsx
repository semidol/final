import { CarouselProvider, Slide, Slider, ButtonBack, ButtonNext } from 'pure-react-carousel';
import style from './resultSlider.module.scss';
import arrow from './arrow.png';
import { useBlockWidth, useWindowWidth } from '../../../hooks';
import Loader from './../../Loader/Loader';

export default function ResultSlider({isLoad, data}) {
	const sliderWidth = useBlockWidth(style.slides);
	const windowWidth = useWindowWidth();

	return (
		<div className={style.sliderContainer}>
			<div className={style.sliderWrapper}>
				<ul className={style.header}>
					<li className={style.columnName}>Период</li>
					<li className={style.columnName}>Всего</li>
					<li className={style.columnName}>Риски</li>
				</ul>
				<CarouselProvider
					visibleSlides={isLoad || !data ? 1 : windowWidth > 767 ? Math.floor(sliderWidth/130) : 1}
					totalSlides={isLoad || !data ? 1 : 13}
					className={style.slider}
				>
					{
					isLoad ?
					<Slider className={style.slides}>
						<Slide className={style.slide} index={0}>
							<div className={style.loading}>
								<div className={style.loader}>
									<Loader />
								</div>
								<div className={style.loadingText}>Загружаем данные</div>
							</div>
						</Slide>
					</Slider>
					:
					data?.data.length ?
					<Slider className={style.slides}>
						{data?.data[0]?.data?.map((item,index) => {
							let year = item.date.slice(0,4);
							let month = item.date.slice(5,7);
							let day = item.date.slice(8,10);
							return <Slide key={index} classNameVisible={style.visibleSlide} className={style.slide} index={0}>
								<ul className={style.resultList}>
									<li className={style.resultItem}>
										{year + '.' + month + '.' + day}
									</li>
									<li className={style.resultItem}>{item.value}</li>
									<li className={style.resultItem}>{data?.data[1]?.data[index]?.value}</li>
								</ul>
							</Slide>
						})}
					</Slider>
					:
					<Slider className={style.slides}>
						<Slide className={style.slide} index={0}>
						 	<div className={style.loadingText}>
								Ошибка загрузки
							</div>
						</Slide>
					</Slider>
					}
					<ButtonBack className={style.back}>
						<img src={arrow} alt="Назад" />
					</ButtonBack>
					<ButtonNext className={style.next}>
						<img src={arrow} alt="Вперед" />
					</ButtonNext>
				</CarouselProvider>
			</div>
		</div>
	)
}