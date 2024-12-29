import { cn } from '@/utils/tw-merge';
import { CSSProperties, FC, ReactNode } from 'react';

interface AnimatedShinyTextProps {
	children: ReactNode;
	className?: string;
	shimmerWidth?: number;
}

const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
	children,
	className,
	shimmerWidth = 100,
}) => {
	return (
		<p
			style={
				{
					'--shiny-width': `${shimmerWidth}px`,
				} as CSSProperties
			}
			className={cn(
				'mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70',

				// Shine effect
				'animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',

				// Shine gradient
				'bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent  dark:via-white/80',

				className
			)}
		>
			{children}
		</p>
	);
};

export function AnimatedShinyTextWithBorder({ text }: { text: string }) {
	return (
		<div className='z-10 flex items-center justify-center'>
			<div
				className={cn(
					'backdrop-blur-[4px] inline-flex h-9 items-center justify-between rounded-full border text-white relative border-blue-100/20 bg-blue-200/10 py-2 outline-none ring-yellow-300 transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-yellow-100 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-yellow-200/40 hover:text-yellow-300 after:hover:bg-opacity-15 focus:ring-2 mt-6'
				)}
				// style={{
				// 	background: `linear-gradient(0deg, rgba(153, 175, 255, 0.04), rgba(153, 175, 255, 0.04)), rgba(255, 255, 255, 0.02)`,
				// 	boxShadow: `inset 0 -6px 12px rgba(255, 255, 255, 0.04)`,
				// }}
			>
				<AnimatedShinyText className='inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400'>
					<span>{text}</span>
				</AnimatedShinyText>
			</div>
		</div>
	);
}
