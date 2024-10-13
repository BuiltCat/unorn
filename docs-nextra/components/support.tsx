import { Check, X } from 'lucide-react'

interface Props {
  attribute: string
  support: boolean
}

export default function Support({ attribute, support }: Props) {
  return (
    <div
      style={{
        marginTop: '1rem',
        width: '50%',
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <a>{attribute}</a>
      {support ? <Check color="#00ffaa" /> : <X />}
    </div>
  )
}
