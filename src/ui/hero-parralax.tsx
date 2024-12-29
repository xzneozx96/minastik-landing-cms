'use client';
import React from 'react';
import {
	motion,
	useScroll,
	useTransform,
	useSpring,
	MotionValue,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SparklesCore } from './sparkles';

export const HeroParallax = ({
	products,
}: {
	products: {
		title: string;
		link: string;
		thumbnail: string;
	}[];
}) => {
	const firstRow = products.slice(0, 5);
	const secondRow = products.slice(5, 10);
	const thirdRow = products.slice(10, 15);
	const ref = React.useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	});

	const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

	const translateX = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, 1000]),
		springConfig
	);
	const translateXReverse = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, -1000]),
		springConfig
	);
	const rotateX = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [15, 0]),
		springConfig
	);
	const opacity = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
		springConfig
	);
	const rotateZ = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [20, 0]),
		springConfig
	);
	const translateY = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
		springConfig
	);
	return (
		<div
			ref={ref}
			className='lg:h-[2800px] h-[2100px] py-80 antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] will-change-transform'
		>
			<Header />
			<motion.div
				style={{
					rotateX,
					rotateZ,
					translateY,
					opacity,
				}}
				className=''
			>
				<motion.div className='flex flex-row-reverse space-x-reverse md:space-x-20 space-x-10 md:mb-20 mb-10'>
					{firstRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateX}
							key={product.title}
						/>
					))}
				</motion.div>
				<motion.div className='flex flex-row md:mb-20 mb-10 md:space-x-20 space-x-10'>
					{secondRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateXReverse}
							key={product.title}
						/>
					))}
				</motion.div>
				<motion.div className='flex flex-row-reverse space-x-reverse md:space-x-20 space-x-10'>
					{thirdRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateX}
							key={product.title}
						/>
					))}
				</motion.div>
			</motion.div>
		</div>
	);
};

export const Header = () => {
	return (
		<div className='max-w-4xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0 text-center spotlight-background'>
			<div className='inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50'>
				<span className='inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent'>
					Minastik Projects
				</span>
			</div>

			<h2 className='animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle font-semibold text-transparent text-3xl md:text-7xl'>
				We love our Products
			</h2>

			<p className='max-w-2xl mx-auto text-base md:text-xl mt-4 text-blue-200'>
				We are a team of passionate developers and designers that love to build
				amazing products with the latest technologies and frameworks.
			</p>

			<div className='absolute top-0 bottom-0 z-[-1] pointer-events-none select-none'>
				<SparklesCore
					id='projects-sparkle'
					background='transparent'
					minSize={0.6}
					maxSize={2}
					speed={1.5}
					particleDensity={20}
					className='w-full h-full'
					particleColor='#32A7FF'
				/>
			</div>
		</div>
	);
};

export const ProductCard = ({
	product,
	translate,
}: {
	product: {
		title: string;
		link: string;
		thumbnail: string;
	};
	translate: MotionValue<number>;
}) => {
	return (
		<motion.div
			style={{
				x: translate,
			}}
			whileHover={{
				y: -20,
			}}
			key={product.title}
			className='group/product lg:h-96 lg:w-[30rem] h-[18rem] w-[24rem] relative flex-shrink-0 md:ml-20'
		>
			<Link
				href={product.link}
				target='_blank'
				className='block group-hover/product:shadow-2xl '
			>
				<Image
					src={product.thumbnail}
					height='600'
					width='600'
					className='object-cover object-left-top absolute h-full w-full inset-0'
					alt={product.title}
				/>
			</Link>
			<div className='absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-60 bg-black pointer-events-none'></div>
			<h2 className='absolute bottom-4 left-4 text-2xl opacity-0 group-hover/product:opacity-100 text-white'>
				{product.title}
			</h2>
		</motion.div>
	);
};
