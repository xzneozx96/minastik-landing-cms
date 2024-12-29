'use client';

import Link from 'next/link';
import Logo from './logo';
import { BlurFade } from './blur-fade';
import { useState } from 'react';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleMenuToggle = () => {
		setIsMenuOpen((prevState) => !prevState);
	};

	const closeMenuOnNav = () => {
		setIsMenuOpen((prevState) => false);
	};

	return (
		<header className='fixed top-0 md:top-5 w-full flex sm:px-10 min-h-[70px] z-50'>
			<div className='relative mx-auto max-w-4xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-5 w-full md:rounded-full backdrop-blur-[10px] bg-[#0a0d1fcc] border border-[#232d6b]'>
				<Logo />

				<div
					id='collapseMenu'
					className={`bg-[#0a0d1fcc] md:bg-transparent h-[calc(100vh-70px)] duration-500 absolute md:static md:w-auto w-full md:h-auto flex md:items-center gap-[1.5vw] top-[100%] ${
						isMenuOpen ? 'left-[0%]' : 'left-[-100%]'
					} px-5 md:py-0 py-5`}
				>
					<ul className='lg:flex gap-x-10 w-full'>
						<li className='max-lg:py-3 px-3'>
							<Link
								href='/'
								className='hover:text-[#60a5fa] text-[#60a5fa] block font-semibold text-[15px]'
								onClick={closeMenuOnNav}
							>
								Home
							</Link>
						</li>

						<li className='max-lg:py-3 px-3'>
							<Link
								href='/signup'
								className='hover:text-[#60a5fa] text-blue-200 block font-semibold text-[15px]'
								onClick={closeMenuOnNav}
							>
								Portfolio
							</Link>
						</li>

						<li className='max-lg:py-3 px-3'>
							<Link
								href='/signup'
								className='hover:text-[#60a5fa] text-blue-200 block font-semibold text-[15px]'
								onClick={closeMenuOnNav}
							>
								Blogs
							</Link>
						</li>

						<li className='max-lg:py-3 px-3'>
							<Link
								href='/signup'
								className='hover:text-[#60a5fa] text-blue-200 block font-semibold text-[15px]'
								onClick={closeMenuOnNav}
							>
								About
							</Link>
						</li>
					</ul>
				</div>

				<div className='flex max-lg:ml-auto space-x-4'>
					<button className='px-4 py-2 rounded-lg md:rounded-full text-sm bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]'>
						Contact Us
					</button>

					<button
						id='toggleOpen'
						className='lg:hidden'
						onClick={handleMenuToggle}
					>
						<svg
							className='w-7 h-7'
							fill='#fff'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
								clipRule='evenodd'
							></path>
						</svg>
					</button>
				</div>
			</div>
		</header>
	);
}
