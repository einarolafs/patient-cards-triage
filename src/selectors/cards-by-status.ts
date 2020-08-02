import { createSelector } from 'reselect'

import { State, CardStatus } from '../store/types'

const selectCards = (state: State) => state.cards

const cardsByStatus = createSelector(
  selectCards,
  (cards) => {
    const pending = cards.filter(({ status }) => status === CardStatus.PENDING)
    const rejected = cards.filter(({ status }) => status === CardStatus.REJECTED)
    const done = cards.filter(({ status }) => status === CardStatus.DONE)

    return { pending, rejected, done }
  }
)

export default cardsByStatus
