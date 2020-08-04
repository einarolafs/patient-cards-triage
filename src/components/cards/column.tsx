import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import classcat from 'classcat'

import './column.scss'

type Props = {
  id: string
  children: React.ReactChildren | React.ReactChild
  className?: string
  styleName?: string
  onDrop?: (event: React.DragEvent, id: string) => void
  title: string
  disabled: (column: string) => boolean
}

const Column: React.FC<Props> = ({ children, className, id, onDrop, title, disabled }: Props) => {
  const [isDisabled, setDisabled] = useState(false)

  const timeout = useRef<typeof setTimeout>(null)

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current)
    }
  }, [])

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      onDrop?.(event, id)

      if (disabled(id)) {
        setDisabled(true)

        timeout.current = setTimeout(() => {
          setDisabled(false)
        }, 1000)
      }
    },
    [onDrop, id, disabled]
  )

  const handleDragEnter = useCallback((event: React.DragEvent) => {
    event.preventDefault()

    return false
  }, [])

  const handleDragLeave = useCallback((event) => {
    event.preventDefault()
  }, [])

  const handleDragOver = useCallback((event) => {
    event.preventDefault()

    return false
  }, [])

  const classes = useMemo(() => classcat(['container', { disabled: isDisabled }]), [isDisabled])

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
