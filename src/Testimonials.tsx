const Testimonials = () => {
	const testimonials = [
		{
			name: 'Shmuel Farhi',
			role: 'CEO, Farhi',
			image: 'https://lemirq.github.io/car-detailing/guy.jpg',
			text: "I absolute love the work that was done on my car. It looks brand new and I couldn't be happier. I would recommend this service to anyone looking to get their car detailed.",
		},
		{
			name: 'Olga Plagianakos',
			role: 'Executive Director at DECA Ontario',
			image: 'https://lemirq.github.io/car-detailing/olga.jpeg',
			text: 'The service was amazing! My car looks brand new and the team was so professional. I would highly recommend this service to anyone looking to get their car detailed.',
		},
		{
			name: 'Emily Thompson',
			role: 'Marketing Director, Thompson Co.',
			image: 'https://i.pravatar.cc/100?img=1',
			text: "I was amazed by the attention to detail and professionalism of the team. My car has never looked better! I'll definitely be returning for future detailing needs.",
		},
		{
			name: 'Sophia Patel',
			role: 'Designer, Patel Designs',
			image: 'https://i.pravatar.cc/100?img=10',
			text: "I've been to many car detailing services before, but none have impressed me as much as this one. The results speak for themselves. Thank you for your excellent work!",
		},
		{
			name: 'John Smith',
			role: 'CEO, Smith Enterprises',

			image: 'https://i.pravatar.cc/100?img=7',
			text: "I can't believe the transformation my car underwent. It's like it rolled off the showroom floor again. The team's dedication to perfection is unmatched.",
		},
		{
			name: 'Emma Davis',
			role: 'Accountant, Davis & Co.',
			image: 'https://i.pravatar.cc/100?img=5',
			text: "From start to finish, the experience was seamless. The staff was friendly, the service was impeccable, and my car looks stunning. I'll definitely be recommending this to my friends.",
		},
	];
	return (
		<>
			<div className="w-full min-h-screen bg-gray-50 fc py-5 px-10 text-black">
				<div className="text-center max-w-xl mx-auto">
					<h1 className="text-6xl md:text-7xl font-bold mb-5">Testimonials</h1>
					<h3 className="text-xl mb-5 font-light">Here's what our customers have to say about our service.</h3>
					<div className="text-center mb-10">
						<span className="inline-block w-1 h-1 rounded-full bg-sky-500 ml-1"></span>
						<span className="inline-block w-3 h-1 rounded-full bg-sky-500 ml-1"></span>
						<span className="inline-block w-40 h-1 rounded-full bg-sky-500"></span>
						<span className="inline-block w-3 h-1 rounded-full bg-sky-500 ml-1"></span>
						<span className="inline-block w-1 h-1 rounded-full bg-sky-500 ml-1"></span>
					</div>
				</div>
				<div className="grid items-start grid-cols-3 gap-5">
					{testimonials.map((testimonial, index) => (
						<figure key={index} className="bg-slate-100 rounded-xl p-8 light">
							<img className="w-24 h-auto rounded-full mx-auto" src={testimonial.image} alt="" />
							<div className="pt-6 text-center space-y-4">
								<blockquote>
									<p className="text-lg font-medium">&ldquo;{testimonial.text}&rdquo;</p>
								</blockquote>
								<figcaption className="font-medium">
									<div className="text-sky-500">{testimonial.name}</div>
									<div className="text-slate-700">{testimonial.role}</div>
								</figcaption>
							</div>
						</figure>
					))}
				</div>
			</div>
		</>
	);
};

export default Testimonials;
