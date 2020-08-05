import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Checkbox from '../checkbox'

describe('App', () => {
  let element: HTMLElement
  const title = 'Checkbox title'
  const name = 'Checkbox name'
  const spyOnChange = jest.fn()

  beforeEach(() => {
    const { container } = render(<Checkbox name={name} title={title} onChange={spyOnChange} />)

    element = container

    spyOnChange.mockClear()
  })

  test('render with correct label', () => {
    expect(element.querySelector('label')).toHaveTextContent(title)
  })

  test('render with correct input name', () => {
    expect(element.querySelector('input')).toHaveAttribute('name', name)
  })

  test('fires onChange function when input is clicked', () => {
    fireEvent.click(element.querySelector('input'), {})
    expect(spyOnChange).toBeCalled()
  })
})
