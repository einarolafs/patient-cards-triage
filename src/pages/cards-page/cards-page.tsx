import React, { useCallback, SyntheticEvent, useEffect } from 'react'

import { Cards } from '../../components'

import './cards-page.scss'

type Props = {
  actions: {
    getCards: () => void
  }
}

const CardsPage: React.FC<Props> = ({ actions }: Props) => {
  useEffect(() => {
    actions.getCards()
  }, [])

  const handleDrop = useCallback((event: SyntheticEvent, id: string) => {
    console.log({ event, id })
  }, [])

  return (
    <div styleName="cards-view">
      <Cards.Column id="pending" onDrop={handleDrop} styleName="pending">
        <Cards.Card id="card1"/>
      </Cards.Column>
      <Cards.Column id="rejected" onDrop={handleDrop} styleName="rejected">
        <Cards.Card id="card1"/>
      </Cards.Column>
      <Cards.Column id="done" onDrop={handleDrop} styleName="done">
        <Cards.Card id="card1"/>
      </Cards.Column>
    </div>
  )
}

export default CardsPage
