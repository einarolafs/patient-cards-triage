import React, { useCallback, useMemo, useState } from 'react'
import classcat from 'classcat'

import './column.scss'

type Props = {
  id: string
  children: React.ReactChildren | React.ReactChild
  className?: string
  styleName?: string
  onDrop?: (event: React.DragEvent, id: string) => void
  title: string
}

const Column: React.FC<Props> = ({ children, className, id, onDrop, title }: Props) => {
  const [dragOver, setDragEnter] = useState(false)

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      // ('drop', id)
      onDrop?.(event, id)
    },
    [onDrop, id]
  )

  const handleDragEnter = useCallback((event: React.DragEvent) => {
    event.preventDefault()

    setDragEnter(true)

    return false
  }, [])

  const handleDragLeave = useCallback((event) => {
    event.preventDefault()
    // console.log('on drag leave', id, event.dataTransfer.items.length)
    setDragEnter(false)
  }, [])

  const handleDragOver = useCallback((event) => {
    event.preventDefault()

    return false
  }, [])

  const classes = useMemo(() => classcat(['container', { 'drag-over': dragOver }]), [dragOver])

  return (
    <div
      styleName={classes}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={className}
      id={id}
    >
      <h2 styleName="title">{title}</h2>
      <ul>{children}</ul>
    </div>
  )
}

export default Column
