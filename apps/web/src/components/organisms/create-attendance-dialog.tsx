import * as Dialog from '@radix-ui/react-dialog'

import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import { type CreateAttendanceInput } from '@/types/api'

type CreateAttendanceDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  values: CreateAttendanceInput
  error: string | null
  isSubmitting: boolean
  onChange: (field: keyof CreateAttendanceInput, value: string) => void
  onSubmit: () => Promise<void>
}

const CreateAttendanceDialog = ({
  isOpen,
  onOpenChange,
  values,
  error,
  isSubmitting,
  onChange,
  onSubmit,
}: CreateAttendanceDialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <Button>Novo atendimento</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/35 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-sm border border-[var(--border)] bg-[var(--surface-strong)] p-6 shadow-[var(--shadow)] outline-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-2xl text-[var(--foreground)]">
                Criar atendimento
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-[var(--muted)]">
                Informe cliente e assunto. A distribuicao sera feita
                automaticamente.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost">Fechar</Button>
            </Dialog.Close>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block space-y-2">
              <span className="text-sm text-[var(--foreground)]">Cliente</span>
              <Input
                value={values.customerName}
                onChange={(event) =>
                  onChange('customerName', event.target.value)
                }
                placeholder="Nome do cliente"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-[var(--foreground)]">Assunto</span>
              <Input
                value={values.subject}
                onChange={(event) => onChange('subject', event.target.value)}
                placeholder="Ex.: problema com cartao"
              />
            </label>

            {error ? (
              <p className="text-sm text-[var(--danger)]">{error}</p>
            ) : null}

            <div className="flex justify-end gap-3">
              <Dialog.Close asChild>
                <Button variant="secondary">Cancelar</Button>
              </Dialog.Close>
              <Button disabled={isSubmitting} onClick={() => void onSubmit()}>
                {isSubmitting ? 'Salvando...' : 'Distribuir atendimento'}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CreateAttendanceDialog
