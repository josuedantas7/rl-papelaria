import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps {
    type?: string;
    label: string
    placeholder?: string
    onChange: (value: string) => void
}

export function InputWithLabel({label,placeholder,type,onChange} : InputWithLabelProps) {
  return (
    <div className="w-full flex-col items-center gap-1.5">
      <Label htmlFor="email">{label}</Label>
      <Input onChange={(e) => onChange(e.target.value)} type={type || 'text'} id={label} placeholder={placeholder || label} />
    </div>
  )
}
