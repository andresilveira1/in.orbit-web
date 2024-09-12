import { RadioGroupIndicator, RadioGroupItem } from './ui/radio-group'

interface DesireFrequencyGoalProps {
  value: string
  children: React.ReactNode
  icon: string
}

export function DesireFrequencyGoal({
  value,
  children,
  icon,
}: DesireFrequencyGoalProps) {
  return (
    <RadioGroupItem value={value}>
      <RadioGroupIndicator />
      <span className="text-zinc-300 text-sm font-medium leading-none">
        {children}
      </span>
      <span className="text-lg leading-none">{icon}</span>
    </RadioGroupItem>
  )
}
