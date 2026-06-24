import Card from '@/components/atoms/card'

type StatCardProps = {
  label: string
  value: string
  detail: string
}

const StatCard = ({ label, value, detail }: StatCardProps) => {
  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-3 font-[var(--font-serif)] text-4xl leading-none text-[var(--foreground)]">
        {value}
      </p>
      <p className="mt-3 text-sm text-[var(--muted)]">{detail}</p>
    </Card>
  )
}

export default StatCard
