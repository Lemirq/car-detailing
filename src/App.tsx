import 'mapbox-gl/dist/mapbox-gl.css';

import { MdOutlinePhone } from 'react-icons/md';
import mapboxgl from 'mapbox-gl';
import { FaBox } from 'react-icons/fa';
import { IoMail, IoPerson } from 'react-icons/io5';
import { FaThumbsUp } from 'react-icons/fa6';
import { IoIosPricetag } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure, Button } from '@nextui-org/react';
import { toast } from 'sonner';
import { CarouselCustomNavigation } from './Carousel';
import { BackgroundBeams } from './Beams';
import Testimonials from './Testimonials';

const App = () => {
	mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC;

	const long = 42.941374737376194;
	const lat = -81.25466891626245;
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);

	const [currentVideo, setCurrentVideo] = useState(0);
	const videos = [
		'https://lemirq.github.io/car-detailing/videos/1.mp4',
		'https://lemirq.github.io/car-detailing/videos/2.mp4',
		'https://lemirq.github.io/car-detailing/videos/3.mp4',
		'https://lemirq.github.io/car-detailing/videos/4.mp4',
		'https://lemirq.github.io/car-detailing/videos/5.mp4',
	];
	const video = useRef<HTMLVideoElement | null>(null);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	// video use effect: when one video ends, play the next one
	useEffect(() => {
		if (!video.current) return;
		video.current.onended = () => {
			setCurrentVideo((prev) => (prev + 1) % videos.length);
		};
	}, [currentVideo, videos.length]);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current!,
			style: 'mapbox://styles/mapbox/standard',
			center: [-81.24214085855093, 42.98083551419571],
			zoom: 5,
		});

		map.current.on('load', () => {
			if (!map.current) return;

			new mapboxgl.Marker({
				color: '#000',
				anchor: 'bottom',
			})
				.setLngLat([lat, long])
				.addTo(map.current);
			// disable zoom
			map.current.scrollZoom.disable();
		});
		const observer = new IntersectionObserver((entries) => {
			// If the observed element is intersecting (i.e., in the viewport), call the flyTo function
			if (entries[0].isIntersecting) {
				console.log('intersecting');
				map.current?.flyTo({
					center: [lat, long],
					zoom: 15,
					speed: 0.5,
					curve: 1,
				});
			}
		});

		// Start observing the element
		if (mapContainer.current) {
			observer.observe(document.querySelector('.mapboxgl-canvas')!);
		}

		// Clean up the observer when the component unmounts
		return () => {
			if (mapContainer.current) {
				observer.unobserve(mapContainer.current);
			}
		};
	}, []);

	const loaner = [
		{
			day: 'Monday',
			time: '8:00am - 5:00pm',
		},
		{
			day: 'Tuesday',
			time: '❌ Booked',
		},
		{
			day: 'Wednesday',
			time: '8:00am - 5:00pm',
		},
		{
			day: 'Thursday',
			time: '8:00am - 5:00pm',
		},
		{
			day: 'Friday',
			time: '❌ Booked',
		},
		{
			day: 'Saturday',
			time: '8:00am - 5:00pm',
		},
	];

	const carDetails = [
		{
			heading: 'Make & Model',
			detail: 'Honda Accord',
		},
		{
			heading: 'Year',
			detail: '2007',
		},
		{
			heading: 'Color',
			detail: 'Grey',
		},
		{
			heading: 'Engine',
			detail: '2.4L 4-cylinder',
		},
		{
			heading: 'Transmission',
			detail: 'Automatic',
		},
		{
			heading: 'Mileage',
			detail: '200,000 km',
		},
	];

	const services = [
		'Thoroughly hand wash exterior',
		'Hand dry exterior',
		'Clean tires (and white walls) and wheels',
		'Polish all chrome (if any)',
		'Hand wax and polish exterior',
		'Apply rain repellent',
		'Clean windows and mirrors',
		'Clean door and trunk jambs',
		'Detail interior (including cleaning air vents, switches, cup holders, dash, console, and panel doors)',
		'Steam clean carpets',
		'Clean seats (using special cleaner for leather seats and wet upholstery cleaner for the rest)',
		'Apply fabric guard',
		'Clean rubber mats or vacuum mats',
		'Deodorize',
	];

	const data = [
		{
			heading: 'Best Prices',
			detail: 'We offer the best prices in the industry, ensuring you get the best value for your money.',
			icon: <IoIosPricetag />,
		},
		{
			heading: '100% Guarantee',
			detail: 'We guarantee 100% satisfaction, ensuring you get the best value for your money.',
			icon: <FaThumbsUp />,
		},
		{
			heading: 'Certified Products',
			detail: "We use only the best products for your car's detailing, ensuring you get the best value for your money.",
			icon: <FaBox />,
		},
	];

	const container = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
		}),
	};
	const child = {
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
		hidden: {
			opacity: 0,
			y: 100,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
	};

	return (
		<div className="light">
			<main className="fc min-h-screen w-screen justify-start text-white overflow-x-hidden font-dmsans">
				<section className="py-60 w-full relative fc items-start">
					<div
						style={{
							background: 'radial-gradient(ellipse 100% 80% at 80% 20%, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)',
						}}
						className="object-cover object-center absolute z-10 w-full h-full"
					></div>
					{/* <div className="absolute inset-0 bg-[url(/bg.jpg)] bg-cover bg-no-repeat w-full h-full"></div> */}
					<video ref={video} autoPlay muted src={videos[currentVideo]} className="absolute inset-0 w-full h-full object-cover" />

					{/* MAINHERO */}
					<MotionConfig transition={{ duration: 0.5 }}>
						<div className="fc text-white z-20 w-full px-20 gap-4 max-w-3xl items-start">
							<motion.h1
								initial={{ opacity: 0, y: -100 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="text-6xl font-bold"
							>
								Detailing your car has never been easier.
							</motion.h1>
							<motion.p
								// left to right
								initial={{ opacity: 0, x: -100 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.5, duration: 0.5 }}
							>
								We specialize in delivering top-tier detailing services, ensuring the highest quality results.
							</motion.p>
							<motion.div
								// framer motion stagger
								// down to top
								initial={{ opacity: 0, y: 100 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 1, duration: 0.5 }}
								className="fr gap-5 w-full justify-start"
							>
								{/* <button className="px-5 py-2 bg-blue-500 uppercase font-days rounded-2xl">make appointment</button> */}

								<Button onPress={onOpen} color="primary">
									Make appointment
								</Button>
								<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
									<ModalContent>
										{(onClose) => (
											<>
												<ModalHeader className="flex flex-col gap-1">Make an appointment</ModalHeader>
												<ModalBody>
													<form
														className="fc gap-3"
														onSubmit={(e) => {
															e.preventDefault();
															toast.success('Appointment made successfully we will contact you soon!');
															onClose();
														}}
													>
														<Input
															endContent={
																<IoPerson className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
															}
															label="Name"
															placeholder="Enter your name"
															type="text"
															variant="bordered"
															isRequired
														/>
														<Input
															autoFocus
															endContent={
																<IoMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
															}
															label="Email"
															placeholder="Enter your email"
															variant="bordered"
															isRequired
														/>
														{/* phone number */}
														<Input
															endContent={
																<MdOutlinePhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
															}
															label="Phone"
															placeholder="Enter your phone number"
															type="tel"
															variant="bordered"
															isRequired
														/>
														{/* calendar */}
														<Input isRequired label="Date" placeholder="Select a date" type="date" variant="bordered" />

														<div className="w-full justify-end gap-2 fr mb-3">
															<Button color="danger" variant="flat" onPress={onClose}>
																Cancel
															</Button>
															<Button type="submit" color="primary">
																Submit
															</Button>
														</div>
													</form>
												</ModalBody>
											</>
										)}
									</ModalContent>
								</Modal>

								<p className="whitespace-nowrap">or call us at</p>
								<div className="fr gap-2">
									<MdOutlinePhone size={30} />
									<p className="whitespace-nowrap">123 456 7890</p>
								</div>
							</motion.div>
						</div>
					</MotionConfig>
				</section>

				{/* FEATURES */}
				<section className="grid grid-cols-3 pb-10 px-10 bg-black w-full gap-5">
					{data.map((item, i) => (
						<motion.div
							initial={{ opacity: 0, y: -100 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.5 + 1.5, duration: 0.5 }}
							key={i}
							className="fr gap-4 items-start px-7 py-5 rounded-2xl bg-zinc-800 w-full"
						>
							<span className="text-5xl">{item.icon && item.icon}</span>
							<div className="fc gap-2 items-start">
								<h2 className="text-2xl font-bold">{item.heading}</h2>
								<p>{item.detail}</p>
							</div>
						</motion.div>
					))}
				</section>
				{/* MAPBOXMAP */}
				<section className="w-full py-10 fc gap-5 relative text-black">
					<h2 className="text-4xl font-bold w-full text-center">Our Location</h2>
					<div className="grid grid-cols-2 gap-3 w-full items-start px-10">
						<motion.div
							// left to right
							initial={{ opacity: 0, x: -100 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 1 }}
							className="px-6 py-5 bg-zinc-100 rounded-3xl"
						>
							<h1 className="text-4xl font-bold">Over The Top Car Care</h1>
							<h1 className="uppercase text-blue-500 tracking-wider text-4xl font-black">london</h1>
							<div className="w-5 h-1 bg-yellow-500 my-5"></div>
							<div className="fc text-xl items-start">
								<p>250 Southdale E.</p>
								<p>London, ON | N6C 4X5</p>
							</div>
							<div className="mt-7">
								<h3 className="font-bold text-2xl tracking-tighter">Regular Hours</h3>
								<p>Monday - Friday: 8:00am - 5:00pm</p>
								<p>Saturday: 8:00am - 5:00pm</p>
							</div>
						</motion.div>
						<div ref={mapContainer} className="w-full relative row-span-2 h-full rounded-2xl" />
						<motion.img
							// right to left
							initial={{ opacity: 0, y: -100 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 1 }}
							src="http://88designbox.com/upload/2022/01/20/vehicle-clean-room-buenos-aires-by-fallone-studio-07.jpg"
							className="rounded-2xl w-full"
							alt=""
						/>
					</div>
				</section>

				<section className="mx-10 py-36 text-white bg-zinc-900 w-full relative">
					<div className="fc w-full container mx-auto gap-5 z-30 relative">
						<motion.img
							// blur in
							initial={{ opacity: 0, filter: 'blur(10px)' }}
							whileInView={{ opacity: 1, filter: 'blur(0px)' }}
							transition={{ duration: 1 }}
							viewport={{ once: true }}
							src="https://lemirq.github.io/car-detailing/gt3rs.jpg"
							className="w-full rounded-2xl aspect-[4/1] object-cover"
							alt="gt3rs"
						/>
						<motion.div
							variants={container}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							// className="text-[clamp(40px,_8vw,_96px)] font-bold bg-gradient-to-r from-[#FA574D] to-[#FCBB4D] bg-clip-text text-transparent overflow-hidden flex min-h-[80px] fr"
							className="text-[clamp(40px,_8vw,_96px)] overflow-hidden flex font-articulat fr font-bold text-white"
						>
							{['T', 'h', 'e', ' ', 'W', 'o', 'r', 'k', 's'].map((letter, index) => (
								<motion.span variants={child} key={index} viewport={{ once: true }}>
									{letter === ' ' ? '\u00A0' : letter}
								</motion.span>
							))}
						</motion.div>

						{/* <h1 className="text-6xl font-bold bg-gradient-to-r from-[#FA574D] to-[#FCBB4D] bg-clip-text text-transparent">The Works</h1> */}
						<p className="text-3xl font-rubik">
							$199.99 <span className="text-sm">before taxes</span>
						</p>
						<p className="max-w-2xl">
							Our most comprehensive package, The Works includes a full interior and exterior detailing, ensuring your car looks brand
							new. Here's what's included:
						</p>
						<ul className="gap-3 grid grid-cols-3">
							{services.map((service, i) => (
								<motion.li
									initial={{ opacity: 0, y: 100 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.2, duration: 0.2 }}
									className="px-5 py-2 bg-zinc-800/20 rounded-2xl text-xl backdrop-blur-sm"
									key={i}
								>
									{service}
								</motion.li>
							))}
						</ul>
					</div>
					<BackgroundBeams />

					{/* <div className="fr py-16 text-black gap-10 px-10 bg-zinc-100 rounded-2xl">
					<div className="fc gap-3 justify-start items-start px-5">
						<div className="fc gap-1 items-start">
							<div className="fr gap-3">
								<IoStar size={30} />
								<h2 className="text-4xl font-bold">The Works Package</h2>
							</div>
							<p className="">
								$199.99 <span className="text-sm">before taxes</span>
							</p>
						</div>
						<p>
							Our most comprehensive package, The Works includes a full interior and exterior detailing, ensuring your car looks brand
							new. Here's what's included:
						</p>
						<ul className="services list-disc">
							<li>Thoroughly hand wash exterior</li>
							<li>Hand dry exterior</li>
							<li>Clean tires (and white walls) and wheels</li>
							<li>Polish all chrome (if any)</li>
							<li>Hand wax and polish exterior</li>
							<li>Apply rain repellent</li>
							<li>Clean windows and mirrors</li>
							<li>Clean door and trunk jambs</li>
							<li>Detail interior (including cleaning air vents, switches, cup holders, dash, console, and panel doors)</li>
							<li>Steam clean carpets</li>
							<li>Clean seats (using special cleaner for leather seats and wet upholstery cleaner for the rest)</li>
							<li>Apply fabric guard</li>
							<li>Clean rubber mats or vacuum mats</li>
							<li>Deodorize</li>
						</ul>
					</div>
					<img src="https://lemirq.github.io/car-detailing/a.jpg" className="rounded-2xl w-1/2 h-full" alt="" />
				</div> */}
				</section>

				{/* NEEDS:
      - HERO
      - MAP
      - PRICE of 'the works package'
      - pictures of cars before and after detailing
      - available dates and times for when the 2007 Honda Accord can be given as a loaner
      - telephone number
      */}
				<section className="w-full mx-auto py-36 text-black fc gap-4">
					<h1 className="text-6xl font-bold">
						Before and After <span className="text-blue-500">Detailing</span>
					</h1>
					<CarouselCustomNavigation />
				</section>
				<Testimonials />
				{/* schedule for loaner */}
				<section className="container mx-auto py-20 text-black fc gap-10">
					<h2 className="text-4xl font-bold text-center">Loaner Availability</h2>
					<div className="fc gap-5">
						<p className="font-bold">Available Dates and Times</p>
						<div className="grid grid-cols-3 gap-5">
							{loaner.map((day, i) => (
								<div className="fc gap-5">
									<div key={i} className="fr gap-2">
										<p className="text-xl font-bold">{day.day}</p>
										<p>{day.time}</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="fc gap-5 w-full">
						<p className="font-bold">Car Details</p>
						<div className="grid w-full grid-cols-3 gap-5">
							{carDetails.map((detail, i) => (
								<div className="fc gap-2 px-3 py-2 bg-slate-100 rounded-2xl" key={i}>
									<p className="font-bold">{detail.heading}</p>
									<p>{detail.detail}</p>
								</div>
							))}
						</div>
					</div>
					<img src="https://lemirq.github.io/car-detailing/accord.webp" className="w-full h-full rounded-2xl" alt="" />
				</section>
			</main>
			<footer className="w-full bg-black text-white py-10 fc text-center border border-t-2 border-zinc-400">
				<p>&copy; 2022 Over The Top Car Care. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default App;
