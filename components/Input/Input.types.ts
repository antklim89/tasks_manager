

export type InputProps = {
    label?: string
    errorMessage?: string
} & (
    ({as?: 'input'} & JSX.IntrinsicElements['input']) |
    ({as: 'textarea'} & JSX.IntrinsicElements['textarea'])
)
