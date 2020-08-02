import React, { useCallback, SyntheticEvent, useEffect } from 'react'

import { Cards } from '../../components'
import { NormalizedCardInterface } from '../../store/types'

import './cards-page.scss'

type Props = {
  cards: {
    pending: NormalizedCardInterface[],
    rejected: NormalizedCardInterface[],
    done: NormalizedCardInterface[]
  }
  actions: {
    getCards: () => void
  }
}

const columns = ['pending', 'rejected', 'done']

const CardsPage: React.FC<Props> = ({ actions, cards }: Props) => {
  useEffect(() => {
    actions.getCards()
  }, [])

  console.log(cards)

  const handleDrop = useCallback((event: SyntheticEvent, id: string) => {
    console.log({ event, id })
  }, [])

  return (
    <div styleName="cards-view">
      {columns.map(column => (
        <Cards.Column key={column} id={column} onDrop={handleDrop} styleName={column}>
          {cards[column].map((card: NormalizedCardInterface) => <Cards.Card key={card.id} {...card}/>)}
        </Cards.Column>
      ))}
    </div>
  )
}

export default CardsPage
