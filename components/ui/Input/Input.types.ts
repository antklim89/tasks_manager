

export type InputProps = {
    label?: string
    errorMessage?: string
    reset?: () => void
} & (
    ({as?: 'input'} & JSX.IntrinsicElements['input']) |
    ({as: 'textarea'} & JSX.IntrinsicElements['textarea'])
)
