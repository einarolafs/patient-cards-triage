import React, { useCallback, useEffect } from 'react'

import { Cards, Checkbox } from '../../components'
import { NormalizedCardInterface, CardStatus } from '../../store/types'

import { CardsPageProps, UpdatePagePayloadType } from './types'

import './cards-page.scss'

const columns = Object.values(CardStatus)

const CardsPage: React.FC<CardsPageProps> = ({
  actions,
  cards,
  cardsByStatus,
  dragging,
  filters = {},
  ...props
}: CardsPageProps) => {
  useEffect(() => {
    actions.addPage({ id: 'cards', payload: { dragging: null } })
    actions.getCards()
  }, [])

  const updatePage = useCallback(
    (data: UpdatePagePayloadType) => {
      const id = 'cards'

      if (data.filters) {
        const { name } = data.filters
        const arrhythmias = data.filters.arrhythmias || filters.arrhythmias

        const payload = { filters: { name, arrhythmias } }

        return actions.updatePage({ id, payload })
      }
      actions.updatePage({ id, payload: { dragging, filters, ...data } })
    },
    [actions, dragging, filters]
  )

  const canDragToColumn = useCallback(
    (status: string) => {
      if (typeof dragging === 'number') {
        return (
          (cards[dragging].status === CardStatus.PENDING && status === CardStatus.DONE) ||
          (cards[dragging].status === CardStatus.REJECTED && status === CardStatus.DONE) ||
          (cards[dragging].status === CardStatus.DONE && status === CardStatus.REJECTED)
        )
      }
    },
    [dragging, cards]
  )

  const handleDrop = useCallback(
    (event: React.DragEvent, status: string) => {
      const canDropToColumn = canDragToColumn(status)

      if (canDropToColumn && typeof dragging === 'number') {
        actions.changeCardStatus({ id: dragging, status })
      }

      updatePage({ dragging: null })
    },
    [dragging, actions, updatePage, canDragToColumn]
  )

  const handleDragStart = useCallback((event: React.DragEvent, id: number) => updatePage({ dragging: id }), [
    updatePage,
  ])

  const handleFilteringByName = useCallback(
    (event: { target: HTMLInputElement }) => updatePage({ filters: { name: event.target.value.toLowerCase() } }),
    [updatePage]
  )

  const handleFilteringByArrhythmias = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { name, checked } = event.target as HTMLInputElement

      const filter: Set<string> = new Set()

      if (filters.arrhythmias instanceof Array) {
        filters.arrhythmias.forEach((item) => filter.add(item))
      }

      filter[checked ? 'add' : 'delete'](name)

      updatePage({ filters: { arrhythmias: [...filter] } })
    },
    [updatePage, filters]
  )

  const handleDisabledColumn = useCallback((column: string) => !canDragToColumn(column), [canDragToColumn])

  const { arrhythmias } = props

  return (
    <div styleName="cards-view">
      <div styleName="filters">
        <input type="text" placeholder="Filter by name" onChange={handleFilteringByName} />
        <div styleName="arrhythmia-filter">
          {arrhythmias.map((arrhythmia) => (
            <Checkbox key={arrhythmia} title={arrhythmia} name={arrhythmia} onChange={handleFilteringByArrhythmias} />
          ))}
        </div>
      </div>
      {columns.map((column) => (
        <Cards.Column
          key={column}
          id={column}
          onDrop={handleDrop}
          styleName={column}
          disabled={handleDisabledColumn}
          title={column.toUpperCase()}
        >
          {cardsByStatus[column].map((card: NormalizedCardInterface) => (
            <Cards.Card key={card.id} dragging={card.id === dragging} onDragStart={handleDragStart} {...card} />
          ))}
        </Cards.Column>
      ))}
    </div>
  )
}

export { CardsPageProps }
export default CardsPage
