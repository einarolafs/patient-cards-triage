import React, { useCallback, SyntheticEvent, useMemo, useState } from 'react'
import classcat from 'classcat'

import './column.scss'

type Props = {
  id: string
  children: React.ReactChildren | React.ReactChild
  className?: string
  styleName?: string
  onDrop?: (event: SyntheticEvent, id: string) => void
}

const Column: React.FC<Props> = ({ children, className, id, onDrop }: Props) => {
  const [dragOver, setDragEnter] = useState(false)

  const handleDrop = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault()
      // ('drop', id)
      onDrop?.(event, id)
    },
    [onDrop, id]
  )

  const handleDragEnter = useCallback((event: SyntheticEvent) => {
    event.preventDefault()
    // console.log('on drag enter', id)

    return false
  }, [])

  const handleDragLeave = useCallback((event) => {
    event.preventDefault()
    // console.log('on drag leave', id, event.dataTransfer.items.length)
    setDragEnter(true)
  }, [])

  const handleDragOver = useCallback((event) => {
    event.preventDefault()

    return false
  }, [])

  const classes = useMemo(() => classcat(['container', { 'drag-over': dragOver }]), [dragOver])

  return (
    <ul
      styleName={classes}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={className}
      id={id}
    >
      {children}
    </ul>
  )
}

export default Column
