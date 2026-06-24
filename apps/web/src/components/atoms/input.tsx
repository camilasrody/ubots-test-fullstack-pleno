import { cva, type VariantProps } from 'class-variance-authority'
import { type InputHTMLAttributes } from 'react'

import cn from '@/utils/cn'

const inputVariants = cva(
  'w-full rounded-sm border bg-[var(--color-surface-strong)] px-3 py-2.5 text-sm text-[var(--color-foreground)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]',
  {
    variants: {
      variant: {
        default: 'border-[var(--color-border)]',
        danger: 'border-[var(--color-danger)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>

const Input = ({ className, variant, ...props }: InputProps) => {
  return (
    <input className={cn(inputVariants({ variant }), className)} {...props} />
  )
}

export default Input
