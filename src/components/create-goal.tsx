import { X } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog'
import { RadioGroup } from './ui/radio-group'
import { DesireFrequencyGoal } from './desire-frequency-goal'
import { createGoal } from '../api/create-goal'

const createGoalForm = zod.object({
  title: zod.string().min(1, 'Informe a atividade que deseja realizar.'),
  desiredWeeklyFrequency: zod.coerce.number().min(1).max(7),
})

type CreateGoalForm = zod.infer<typeof createGoalForm>

export function CreateGoal() {
  const queryClient = useQueryClient()

  const { register, handleSubmit, control, formState, reset } =
    useForm<CreateGoalForm>({
      resolver: zodResolver(createGoalForm),
    })

  async function handleCreateGoal(data: CreateGoalForm) {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    })

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

    reset()
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>

            <DialogClose>
              <X className="size-5 text-zinc-600 hover:text-zinc-700" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que{' '}
            <span className="underline">te fazem bem</span> e que você quer
            continuar praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-col justify-between flex-1"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="activity">Qual a atividade?</Label>
              <Input
                autoFocus
                id="activity"
                placeholder="Praticar exercícios, meditar, etc..."
                {...register('title')}
              />

              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="activity">Quantas vezes na semana?</Label>

              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={1}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <DesireFrequencyGoal value="1" icon="🥱">
                        1x na semana
                      </DesireFrequencyGoal>

                      <DesireFrequencyGoal value="2" icon="🙂">
                        2x na semana
                      </DesireFrequencyGoal>

                      <DesireFrequencyGoal value="3" icon="😎">
                        3x na semana
                      </DesireFrequencyGoal>

                      <DesireFrequencyGoal value="4" icon="😎">
                        4x na semana
                      </DesireFrequencyGoal>

                      <DesireFrequencyGoal value="5" icon="🤨">
                        5x na semana
                      </DesireFrequencyGoal>

                      <DesireFrequencyGoal value="6" icon="🤯">
                        6x na semana
                      </DesireFrequencyGoal>

                      <DesireFrequencyGoal value="7" icon="🔥">
                        Todos dias da semana
                      </DesireFrequencyGoal>
                    </RadioGroup>
                  )
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Fechar
              </Button>
            </DialogClose>

            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
