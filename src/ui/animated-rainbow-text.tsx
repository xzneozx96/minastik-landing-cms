import { cn } from '@/utils/tw-merge';
import { ReactNode } from 'react';

export function AnimatedGradientText({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				'group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40',
				className
			)}
		>
			<div
				className={`absolute inset-0 block h-full w-full animate-rainbow bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
			/>

			{children}
		</div>
	);
}

export async function AnimatedRainbowTextWithBorder() {
	return (
		<div className='z-10 flex mb-4 items-center justify-center'>
			<AnimatedGradientText>
				✨{' '}
				<span
					className={cn(
						`inline animate-rainbow bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
					)}
				>
					Grow with Minastik
				</span>
			</AnimatedGradientText>
		</div>
	);
}
