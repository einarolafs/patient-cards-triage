import React, { useCallback, SyntheticEvent } from 'react'

import './card.scss'

type Props = {
  id: string,
  className?: string,
  onDragStart?: (event: SyntheticEvent, id: string) => void
}

const Card: React.FC<Props> = ({ className, onDragStart, id }: Props) => {
  const handleDragStart = useCallback((event: SyntheticEvent) => {
    onDragStart?.(event, id)
  }, [onDragStart, id])

  return (
    <li styleName="card" draggable onDragStart={handleDragStart} className={className}>This is a card content</li>)
}

export default Card
