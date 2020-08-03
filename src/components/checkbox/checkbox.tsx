import React from 'react'

type CheckboxProps = {
  name: string
  title: string
  onChange: (event: React.SyntheticEvent) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ name, onChange, title }: CheckboxProps) => (
  <label htmlFor={name}>
    <input type="checkbox" name={name} onChange={onChange} />
    {title}
  </label>
)

export default Checkbox
