import * as Select from '@radix-ui/react-select'

import { teamLabels, type TeamFilter } from '@/utils/team'

type TeamFilterProps = {
  value: TeamFilter
  onChange: (value: TeamFilter) => void
}

const options: Array<{ label: string; value: TeamFilter }> = [
  { label: 'Todos os times', value: 'ALL' },
  { label: teamLabels.CARDS, value: 'CARDS' },
  { label: teamLabels.LOANS, value: 'LOANS' },
  { label: teamLabels.OTHER, value: 'OTHER' },
]

const TeamFilterField = ({ value, onChange }: TeamFilterProps) => {
  return (
    <Select.Root
      value={value}
      onValueChange={(nextValue: string) => onChange(nextValue as TeamFilter)}
    >
      <Select.Trigger className="inline-flex h-11 items-center justify-between rounded-sm border border-[var(--border)] bg-[var(--surface-strong)] px-3 text-sm text-[var(--foreground)] outline-none data-[placeholder]:text-[var(--muted)] min-w-48">
        <Select.Value />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface-strong)] shadow-[var(--shadow)] backdrop-blur">
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="cursor-pointer rounded-sm px-3 py-2 text-sm text-[var(--foreground)] outline-none data-[highlighted]:bg-[var(--accent-soft)]"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default TeamFilterField
