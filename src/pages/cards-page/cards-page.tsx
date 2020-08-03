import React, { useCallback, useEffect } from 'react'

import { Cards } from '../../components'
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
  filters: { name?: string; arrhythmias?: string }
}

const columns = Object.values(CardStatus)

const CardsPage: React.SFC<CardsPageProps> = ({ actions, cards, dragging, filters = {} }: CardsPageProps) => {
  useEffect(() => {
    actions.addPage('cards', { dragging: null })
    actions.getCards()
  }, [])

  const updatePage = useCallback(
    (payload: object) => {
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

  const handleDragStart = useCallback((event: React.DragEvent, id: string) => updatePage({ dragging: id }), [
    updatePage,
  ])

  const handleFilteringByName = useCallback(
    (event: { target: HTMLInputElement }) => updatePage({ filters: { name: event.target.value.toLowerCase() } }),
    [updatePage]
  )

  const handleFilteringByArrhythmias = useCallback(
    (event: { target: HTMLInputElement }) => updatePage({ filters: { arrhythmias: event.target.value.toLowerCase() } }),
    [updatePage]
  )

  return (
    <div styleName="cards-view">
      <div styleName="filters">
        <input type="text" placeholder="Filter by name" onChange={handleFilteringByName} />
        <input type="text" placeholder="Filter by arrhythmias" onChange={handleFilteringByArrhythmias} />
      </div>
      {columns.map((column) => (
        <Cards.Column key={column} id={column} onDrop={handleDrop} styleName={column} title={column.toUpperCase()}>
          {cards[column].map((card: NormalizedCardInterface) => (
            <Cards.Card key={card.id} dragging={card.id === dragging} onDragStart={handleDragStart} {...card} />
          ))}
        </Cards.Column>
      ))}
    </div>
  )
}

export { CardsPageProps }
export default CardsPage
