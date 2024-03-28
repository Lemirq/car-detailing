import 'mapbox-gl/dist/mapbox-gl.css';

import { MdOutlinePhone } from 'react-icons/md';
import mapboxgl from 'mapbox-gl';
import { FaBox } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import { FaThumbsUp } from 'react-icons/fa6';
import { IoIosPricetag } from 'react-icons/io';
import { useEffect, useRef } from 'react';
import { MotionConfig, motion } from 'framer-motion';

const App = () => {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	mapboxgl.accessToken = 'pk.eyJ1IjoibGVtaXJxIiwiYSI6ImNsdWFveTVhbDBhdWwydnF0cTBlNnJvcjMifQ.A0DR2SGfVm2j2B__KHvuTg';

	useEffect(() => {
		if (!map.current) return;

		map.current = new mapboxgl.Map({
			container: (mapContainer.current && mapContainer.current) || '',
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [0, 0],
			zoom: 2,
			pitch: 30,
		});
		console.log(map.current);

		map.current.on('load', () => {
			if (!map.current) return;

			const marker = new mapboxgl.Marker({
				color: '#000',
				anchor: 'bottom',
			})
				.setLngLat([-81.24214085855093, 42.98083551419571])
				.addTo(map.current);

			map.current?.flyTo({
				center: [-81.24214085855093, 42.98083551419571],
				zoom: 30,
				speed: 1,
				curve: 1,
			});

			map.current.scrollZoom.disable();
			map.current.dragPan.disable();
		});
		const observer = new IntersectionObserver((entries) => {
			// If the observed element is intersecting (i.e., in the viewport), call the flyTo function
			if (entries[0].isIntersecting) {
				map.current?.flyTo({
					center: [-81.24214085855093, 42.98083551419571],
					zoom: 30,
					speed: 1,
					curve: 1,
				});
			}
		});

		// Start observing the element
		if (mapContainer.current) {
			observer.observe(mapContainer.current);
		}

		// Clean up the observer when the component unmounts
		return () => {
			if (mapContainer.current) {
				observer.unobserve(mapContainer.current);
			}
		};
	}, []);

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

	return (
		<main className="fc min-h-screen w-screen justify-start text-white overflow-x-hidden font-dmsans">
			<section className="h-[70vh] w-full relative fc items-start">
				<div
					style={{
						background: 'radial-gradient(ellipse 100% 80% at 80% 20%, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)',
					}}
					className="object-cover object-center absolute z-10 w-full h-full"
				></div>
				<div className="absolute inset-0 bg-[url(/bg.jpg)] bg-cover bg-no-repeat w-full h-full"></div>

				{/* MAINHERO */}
				<MotionConfig transition={{ duration: 0.5 }}>
					<div className="fc text-white z-20 max-w-[50%] w-full px-20 gap-4">
						<motion.h1
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className=" text-6xl font-bold"
						>
							Detailing your car has never been easier.
						</motion.h1>
						<motion.p>We specialize in delivering top-tier detailing services, ensuring the highest quality results.</motion.p>
						<div className="fr gap-5 w-full justify-start">
							<button className="px-5 py-2 bg-blue-500 uppercase font-days">make appointment</button>
							<p className="whitespace-nowrap">or call us at</p>
							<div className="fr gap-2">
								<MdOutlinePhone size={30} />
								<p className="whitespace-nowrap">123 456 7890</p>
							</div>
						</div>
					</div>
				</MotionConfig>
			</section>

			{/* FEATURES */}
			<section className="grid grid-cols-3 px-20 bg-blue-600 py-10 w-full gap-10">
				{data.map((item, i) => (
					<div key={i} className="fr gap-4 items-start">
						<span className="text-5xl">{item.icon && item.icon}</span>
						<div className="fc gap-2 items-start">
							<h2 className="text-2xl font-bold">{item.heading}</h2>
							<p>{item.detail}</p>
						</div>
					</div>
				))}
			</section>
			{/* MAPBOXMAP */}
			<section className="w-full py-10 px-20 fc gap-5 relative">
				<h2 className="text-4xl font-bold text-black w-full text-center overflow-x-hidden">Our Location</h2>
				<div className="w-full h-[70vh]" />
			</section>

			<section className="mx-10 py-20 container">
				<div className="fr py-16 text-black gap-10 px-10 bg-zinc-100 rounded-2xl">
					<div className="fc gap-3 justify-start items-start px-5">
						<div className="fc gap-1 items-start">
							<div className="fr gap-3">
								<IoStar size={30} />
								<h2 className="text-4xl font-bold">The Works Package</h2>
							</div>
							<p className="text-2xl font-rubik">
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
				</div>
			</section>

			{/* NEEDS:
      - HERO
      - MAP
      - PRICE of 'the works package'
      - pictures of cars before and after detailing
      - available dates and times for when the 2007 Honda Accord can be given as a loaner
      - telephone number
      */}
			<section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 ">
				<div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
				<div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
				<div className="mx-auto max-w-2xl lg:max-w-4xl">
					<img className="mx-auto h-12" src="https://lemirq.github.io/car-detailing/farhi.jpeg" alt="" />
					<figure className="mt-10">
						<blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
							<p>
								"I absolute love the work that was done on my car. It looks brand new and I couldn't be happier. I would recommend
								this service to anyone looking to get their car detailed."
							</p>
						</blockquote>
						<figcaption className="mt-10">
							<img className="mx-auto h-10 w-10 rounded-full" src="https://lemirq.github.io/car-detailing/guy.jpg" alt="" />
							<div className="mt-4 flex items-center justify-center space-x-3 text-base">
								<div className="font-semibold text-gray-900">Shmuel Farhi</div>
								<svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
									<circle cx={1} cy={1} r={1} />
								</svg>
								<div className="text-gray-600">CEO of Farhi</div>
							</div>
						</figcaption>
					</figure>
				</div>
			</section>
			{/* schedule for loaner */}
			<section className="container mx-auto py-20 text-black fc gap-10">
				<h2 className="text-4xl font-bold text-center">Loaner Availability</h2>
				<div className="fr gap-10">
					<div className="fc gap-5">
						<h3 className="text-2xl font-bold">2007 Honda Accord</h3>
						<p>Available Dates and Times</p>
						<div className="fr gap-5">
							<div className="fc gap-2">
								<p>Monday</p>
								<p>8:00am - 5:00pm</p>
							</div>
							<div className="fc gap-2">
								<p>Tuesday</p>
								<p>8:00am - 5:00pm</p>
							</div>
							<div className="fc gap-2">
								<p>Wednesday</p>
								<p>8:00am - 5:00pm</p>
							</div>
							<div className="fc gap-2">
								<p>Thursday</p>
								<p>8:00am - 5:00pm</p>
							</div>
							<div className="fc gap-2">
								<p>Friday</p>
								<p>8:00am - 5:00pm</p>
							</div>
							<div className="fc gap-2">
								<p>Saturday</p>
								<p>8:00am - 5:00pm</p>
							</div>
						</div>
					</div>
				</div>
				<img src="https://lemirq.github.io/car-detailing/accord.webp" className="w-full h-full rounded-2xl" alt="" />
			</section>
		</main>
	);
};

export default App;
