import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { type ButtonHTMLAttributes, type ReactNode } from 'react'

import cn from '@/utils/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  children: ReactNode
} & VariantProps<typeof buttonVariants>

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-sm border px-4 py-2 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'border-[var(--color-accent)] bg-[var(--color-foreground)] text-[var(--color-background)] hover:opacity-90',
        secondary:
          'border-[var(--color-border)] bg-[var(--color-surface-strong)] text-[var(--color-foreground)] hover:bg-[var(--color-surface)]',
        ghost:
          'border-transparent bg-transparent text-[var(--color-muted)] hover:border-[var(--color-border)] hover:text-[var(--color-foreground)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

const Button = ({
  asChild,
  children,
  className,
  size,
  variant,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button
