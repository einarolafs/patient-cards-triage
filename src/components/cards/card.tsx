import React, { useCallback, SyntheticEvent } from 'react'

import './card.scss'
import { NormalizedCardInterface } from '../../store/types'

const intlDate = new Intl.DateTimeFormat('en', {
  timeStyle: 'medium',
  dateStyle: 'short'
})

interface Props extends NormalizedCardInterface {
  id: number,
  className?: string,
  onDragStart?: (event: SyntheticEvent, id: number) => void,
  onDragEnd?: (event: SyntheticEvent, id: number) => void,
}

const Card: React.FC<Props> = ({ className, onDragStart, onDragEnd, id, patientName, createdDate, arrhythmias }: Props) => {
  const handleDragStart = useCallback((event: SyntheticEvent) => {
    onDragStart?.(event, id)
  }, [onDragStart, id])

  const handleDragEnd = useCallback((event: SyntheticEvent) => {
    onDragEnd?.(event, id)
  }, [onDragStart, id])

  return (
    <li styleName="card" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} className={className}>
      <h4>{patientName}</h4>
      <p>{intlDate.format(new Date(createdDate))}</p>
    </li>
  )
}

export default Card
