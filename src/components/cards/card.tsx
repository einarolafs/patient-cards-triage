import React, { useCallback, useMemo } from 'react'
import classcat from 'classcat'

import { NormalizedCardInterface } from '../../store/types'

import './card.scss'

const intlDate = new Intl.DateTimeFormat('en', {
  timeStyle: 'medium',
  dateStyle: 'short',
})

interface CardProps {
  className?: string
  onDragStart?: (event: React.DragEvent, id: number) => void
  onDragEnd?: (event: React.DragEvent, id: number) => void
}

type ExtendedCardsProps = CardProps & NormalizedCardInterface

const Card: React.FC<ExtendedCardsProps> = ({
  className,
  onDragStart,
  onDragEnd,
  id,
  patientName,
  createdDate,
  arrhythmias,
  status,
}: ExtendedCardsProps) => {
  const handleDragStart = useCallback(
    (event: React.DragEvent) => {
      onDragStart?.(event, id)
    },
    [onDragStart, id]
  )

  const handleDragEnd = useCallback(
    (event: React.DragEvent) => {
      onDragEnd?.(event, id)
    },
    [onDragEnd, id]
  )

  const classes = useMemo(() => classcat(['card', { [status]: status }]), [status])

  return (
    <li styleName={classes} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} className={className}>
      <h4 styleName="name">Patient Name: {patientName}</h4>

      <section styleName="arrhythmias">
        <h5>Arrhythmias:</h5>
        <ul>
          {arrhythmias.map((arrhythmia) => (
            <li key={arrhythmia}>{arrhythmia}</li>
          ))}
        </ul>
      </section>
      <p styleName="date">{intlDate.format(new Date(createdDate))}</p>
    </li>
  )
}

export default Card
