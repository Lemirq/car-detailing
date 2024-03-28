import { Navigation } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Button } from '@nextui-org/react';
import { useRef } from 'react';
import { IoArrowBackCircle, IoArrowForwardCircle } from 'react-icons/io5';
import { Carousel } from 'flowbite-react';

export function CarouselCustomNavigation() {
	const prev = useRef<HTMLButtonElement>(null);
	const next = useRef<HTMLButtonElement>(null);
	return (
		// <div className="w-full h-[500px] relative">
		// 	<div className="z-20 w-full absolute h-full fr px-5 justify-between">
		// 		<Button isIconOnly ref={prev}>
		// 			<IoArrowBackCircle size={30} />
		// 		</Button>
		// 		<Button isIconOnly ref={next}>
		// 			<IoArrowForwardCircle size={30} />
		// 		</Button>
		// 	</div>
		// 	<Swiper
		// 		navigation={{
		// 			nextEl: next.current,
		// 			prevEl: prev.current,
		// 			hideOnClick: true,
		// 		}}
		// 		autoplay={{
		// 			delay: 5000,
		// 			waitForTransition: true,
		// 			disableOnInteraction: false,
		// 		}}
		// 		modules={[Navigation]}
		// 		className="fc h-[500px]"
		// 	>
		// 		{Array.from({ length: 4 }, (_, i) => (
		// 			<SwiperSlide className="w-full h-full" key={i}>
		// 				<img src={`https://lemirq.github.io/car-detailing/carousel/${i + 1}.png`} className="w-full h-full object-contain" />
		// 			</SwiperSlide>
		// 		))}
		// 	</Swiper>
		// </div>
		<div className="w-full aspect-video bg-black">
			<Carousel>
				{Array.from({ length: 4 }, (_, i) => (
					<img src={`https://lemirq.github.io/car-detailing/carousel/${i + 1}.png`} className="w-full h-full object-contain" />
				))}
			</Carousel>
		</div>
	);
}
