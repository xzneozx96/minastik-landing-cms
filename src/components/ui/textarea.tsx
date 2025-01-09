import { cn } from 'src/utilities/cn'
import * as React from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'block appearance-none p-5 border rounded-lg backdrop-blur-2xl text-white min-h-[80px] w-full border-[#727DA1]/20 bg-[#727DA1]/10 placeholder:text-neutral-300',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
