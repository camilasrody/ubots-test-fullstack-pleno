import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLAttributes } from 'react'

import cn from '@/utils/cn'

const cardVariants = cva(
  'rounded-sm border bg-[var(--color-surface)] shadow-[var(--shadow-panel)] backdrop-blur',
  {
    variants: {
      variant: {
        default: 'border-[var(--color-border)]',
        strong: 'border-[var(--color-border)] bg-[var(--color-surface-strong)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>

const Card = ({ className, variant, ...props }: CardProps) => {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />
}

export default Card
