import React, { useCallback, useMemo } from 'react'
import classcat from 'classcat'

import { NormalizedCardInterface } from '../../store/types'

import './card.scss'

const intlDate = new Intl.DateTimeFormat('en', {
  timeStyle: 'medium',
  dateStyle: 'short',
})

interface Props extends NormalizedCardInterface {
  id: number
  className?: string
  onDragStart?: (event: React.DragEvent, id: number) => void
  onDragEnd?: (event: React.DragEvent, id: number) => void
  dragging: boolean
}

const Card: React.FC<Props> = ({
  className,
  onDragStart,
  onDragEnd,
  id,
  patientName,
  createdDate,
  arrhythmias,
  dragging,
}: Props) => {
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

  const classes = useMemo(() => classcat(['card']), [])

  return (
    <li styleName={classes} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} className={className}>
      <h4>{patientName}</h4>
      <p>{intlDate.format(new Date(createdDate))}</p>
    </li>
  )
}

export default Card
