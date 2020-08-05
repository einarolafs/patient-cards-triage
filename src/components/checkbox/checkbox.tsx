import React from 'react'

import './checkbox.scss'

type CheckboxProps = {
  name: string
  title: string
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ name, onChange = () => null, title }: CheckboxProps) => (
  <div styleName="checkbox">
    <input type="checkbox" name={name} id={name} onChange={onChange} />
    <label htmlFor={name}>{title}</label>
  </div>
)

export default Checkbox
