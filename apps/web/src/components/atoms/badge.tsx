import { cva, type VariantProps } from 'class-variance-authority'
import { type ReactNode } from 'react'

import cn from '@/utils/cn'

type BadgeProps = {
  children: ReactNode
  className?: string
} & VariantProps<typeof badgeVariants>

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 text-xs font-medium uppercase tracking-[0.18em]',
  {
    variants: {
      variant: {
        default:
          'border-[var(--color-border)] bg-[var(--color-surface-strong)] text-[var(--color-foreground)]',
        accent:
          'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]',
        success:
          'border-[color:color-mix(in_oklab,var(--color-success)_30%,transparent)] bg-[color:color-mix(in_oklab,var(--color-success)_15%,transparent)] text-[var(--color-success)]',
        warning:
          'border-[color:color-mix(in_oklab,var(--color-warning)_30%,transparent)] bg-[color:color-mix(in_oklab,var(--color-warning)_15%,transparent)] text-[var(--color-warning)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Badge = ({ children, className, variant }: BadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  )
}

export default Badge
