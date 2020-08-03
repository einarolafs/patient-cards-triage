import React, { useCallback, useEffect } from 'react'

import { Cards, Checkbox } from '../../components'
import { NormalizedCardInterface, CardStatus } from '../../store/types'

import './cards-page.scss'

type CardsPageProps = {
  cards: {
    pending: NormalizedCardInterface[]
    rejected: NormalizedCardInterface[]
    done: NormalizedCardInterface[]
  }
  actions: {
    getCards: () => void
    addPage: (id: string, payload: Record<string, unknown>) => void
    updatePage: (pageId: string, status: Record<string, any>) => void
    changeCardStatus: (cardId: number, status: string) => void
  }
  dragging?: number
  status: string
  filters: { name?: string; arrhythmias?: string[] }
  arrhythmias: string[]
}

type UpdatePagePayloadType = {
  dragging?: CardsPageProps['dragging']
  filters?: CardsPageProps['filters']
}

const columns = Object.values(CardStatus)

const CardsPage: React.SFC<CardsPageProps> = ({
  actions,
  cards,
  dragging,
  filters = {},
  arrhythmias,
}: CardsPageProps) => {
  useEffect(() => {
    actions.addPage('cards', { dragging: null })
    actions.getCards()
  }, [])

  const updatePage = useCallback(
    (payload: UpdatePagePayloadType) => {
      if (payload.filters) {
        const { name } = payload.filters
        const newArrhythmias = payload.filters.arrhythmias || filters.arrhythmias

        return actions.updatePage('cards', { filters: { name, arrhythmias: newArrhythmias } })
      }
      actions.updatePage('cards', { dragging, filters, ...payload })
    },
    [actions, dragging, filters]
  )

  const handleDrop = useCallback(
    (event: React.DragEvent, id: string) => {
      const cardIsInCurrentColumn = cards[id].includes((card: NormalizedCardInterface) => card.id === dragging)

      // eslint-disable-next-line no-undefined
      if (!cardIsInCurrentColumn && dragging !== undefined) {
        actions.changeCardStatus(dragging, id)
      }

      updatePage({ dragging: null })
    },
    [dragging, cards, actions, updatePage]
  )

  const handleDragStart = useCallback((event: React.DragEvent, id: number) => updatePage({ dragging: id }), [
    updatePage,
  ])

  const handleFilteringByName = useCallback(
    (event: { target: HTMLInputElement }) => updatePage({ filters: { name: event.target.value.toLowerCase() } }),
    [updatePage]
  )

  const handleFilteringByArrhythmias = useCallback(
    (event: { target: HTMLInputElement }) => {
      const { name, checked } = event.target

      const filter: Set<string> = new Set()

      if (filters.arrhythmias instanceof Array) {
        filters.arrhythmias.forEach((item) => filter.add(item))
      }

      if (checked) {
        filter.add(name)
      } else {
        filter.delete(name)
      }

      updatePage({ filters: { arrhythmias: [...filter] } })
    },
    [updatePage, filters]
  )

  return (
    <div styleName="cards-view">
      <div styleName="filters">
        <input type="text" placeholder="Filter by name" onChange={handleFilteringByName} />
        <div>
          {arrhythmias.map((arrhythmia) => (
            <Checkbox key={arrhythmia} title={arrhythmia} name={arrhythmia} onChange={handleFilteringByArrhythmias} />
          ))}
        </div>
      </div>
      {columns.map((column) => (
        <Cards.Column key={column} id={column} onDrop={handleDrop} styleName={column} title={column.toUpperCase()}>
          {cards[column].map((card: NormalizedCardInterface) => (
            <Cards.Card
              status={status}
              key={card.id}
              dragging={card.id === dragging}
              onDragStart={handleDragStart}
              {...card}
            />
          ))}
        </Cards.Column>
      ))}
    </div>
  )
}

export { CardsPageProps }
export default CardsPage
