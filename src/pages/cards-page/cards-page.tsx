import React, { useCallback, useEffect } from 'react'

import { Cards } from '../../components'
import { NormalizedCardInterface, CardStatus } from '../../store/types'

import './cards-page.scss'

type Props = {
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
}

const columns = Object.values(CardStatus)

const CardsPage: React.FC<Props> = ({ actions, cards, dragging }: Props) => {
  useEffect(() => {
    actions.addPage('cards', { dragging: null })
    actions.getCards()
  }, [])

  const handleDrop = useCallback(
    (event: React.DragEvent, id: string) => {
      const cardIsInCurrentColumn = cards[id].includes((card: NormalizedCardInterface) => card.id === dragging)

      // eslint-disable-next-line no-undefined
      if (!cardIsInCurrentColumn && dragging !== undefined) {
        actions.changeCardStatus(dragging, id)
      }

      actions.updatePage('cards', { dragging: null })
    },
    [dragging, cards, actions]
  )

  const handleDragStart = useCallback((event: React.DragEvent, id: string) => {
    actions.updatePage('cards', { dragging: id })
  }, [])

  const handleFiltering = useCallback((event: { target: HTMLInputElement }) => {
    console.log(event.target.value)
  }, [])

  return (
    <div styleName="cards-view">
      <input styleName="filter" type="text" placeholder="filter content..." onChange={handleFiltering} />
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

export default CardsPage
