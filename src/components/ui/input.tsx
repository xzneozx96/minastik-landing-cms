import { cn } from 'src/utilities/cn'
import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, ...props }, ref) => {
    return (
      <input
        className={cn(
          'block appearance-none px-5 border rounded-lg backdrop-blur-2xl text-white h-[52px] w-full border-[#727DA1]/20 bg-[#727DA1]/10 placeholder:text-neutral-300',
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
