import React from 'react'
import { render, fireEvent, queryByText } from '@testing-library/react'

import Card from '../card'

const intlDate = new Intl.DateTimeFormat('en', {
  timeStyle: 'medium',
  dateStyle: 'short',
})

describe('App', () => {
  let element: HTMLElement
  const cardData = {
    arrhythmias: ['PVC', 'PSVC', 'AFib'],
    createdDate: '2020-01-01T00:12:21+0000',
    id: 1,
    patientName: 'Bill',
    status: 'rejected',
  }
  const spyOnDragStart = jest.fn()
  const spyOnDragEnd = jest.fn()
  const date = intlDate.format(new Date(cardData.createdDate))

  beforeEach(() => {
    const { container } = render(<Card {...cardData} onDragStart={spyOnDragStart} onDragEnd={spyOnDragEnd} />)

    element = container

    spyOnDragStart.mockClear()
    spyOnDragEnd.mockClear()
  })

  test('render with correct class from status', () => {
    expect(element.querySelector('.card')).toHaveClass(cardData.status)
  })

  test('render with correct patient name', () => {
    expect(element.querySelector('.name')).toHaveTextContent(cardData.patientName)
  })

  test('render with all arrhythmias listed', (done) => {
    cardData.arrhythmias.forEach((arrhythmia) => {
      expect(queryByText(element, arrhythmia)).toHaveTextContent(arrhythmia)
    })
    done()
  })

  test('render date in a localised format', () => {
    expect(element.querySelector('.date')).toHaveTextContent(date)
  })

  test('run handleOnDragStart when onDrag is triggered', () => {
    fireEvent.dragStart(element.querySelector('.card'), {})
    expect(spyOnDragStart).toBeCalled()
  })

  test('run handleOnDrag when onDrag is triggered', () => {
    fireEvent.dragEnd(element.querySelector('.card'), {})
    expect(spyOnDragEnd).toBeCalled()
  })
})
