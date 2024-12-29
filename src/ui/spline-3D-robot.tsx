'use client';

import Spline from '@splinetool/react-spline';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SplineRobot() {
	const splineRef = useRef(null);
	const inView = useInView(splineRef, { amount: 0.5 });

	return (
		<div
			ref={splineRef}
			style={{ height: '100vh' }}
		>
			{inView ? (
				<Spline scene='https://prod.spline.design/CnLR0haZQQ6vG-xd/scene.splinecode' />
			) : (
				<div>Scroll to view the model</div>
			)}
			{/* <video
				autoPlay
				muted
			>
				<source
					src={'videos//robot-48fps.mp4'}
					type='video/mp4'
				/>
				Your browser does not support the video tag.
			</video> */}
		</div>
	);
}
