import React, { useCallback, SyntheticEvent, useEffect } from 'react'

import { Cards } from '../../components'
import { NormalizedCardInterface, CardStatus } from '../../store/types'

import './cards-page.scss'

type Props = {
  cards: {
    pending: NormalizedCardInterface[],
    rejected: NormalizedCardInterface[],
    done: NormalizedCardInterface[]
  }
  actions: {
    getCards: () => void,
    addPage: (id: string, payload: Record<string, unknown>) => void,
    changeCardStatus: (id: number, status: string) => void
  },
  dragging?: number
}

const columns = Object.values(CardStatus)

const CardsPage: React.FC<Props> = ({ actions, cards, dragging }: Props) => {
  useEffect(() => {
    actions.addPage('cards', { dragging: null })
    actions.getCards()
  }, [])

  // console.log(cards)

  const handleDrop = useCallback((event: SyntheticEvent, id: string) => {
    const cardIsInCurrentColumn = cards[id].includes((card: NormalizedCardInterface) => card.id === dragging)

    if (!cardIsInCurrentColumn && dragging >= 0) {
      console.log('running action')
      actions.changeCardStatus(dragging, id)
    }

    // actions.updatePage('cards', { dragging: null })
  }, [dragging, cards, actions])

  const handleDragStart = useCallback((event: SyntheticEvent, id: string) => {
    actions.updatePage('cards', { dragging: id })
    // console.log({ event, id })
  }, [])

  return (
    <div styleName="cards-view">
      {columns.map(column => (
        <Cards.Column key={column} id={column} onDrop={handleDrop} styleName={column}>
          {cards[column].map((card: NormalizedCardInterface) => <Cards.Card key={card.id} onDragStart={handleDragStart} {...card}/>)}
        </Cards.Column>
      ))}
    </div>
  )
}

export default CardsPage
