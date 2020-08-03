import { createSelector } from 'reselect'

import { CardsPageProps } from '../pages/cards-page'
import { State, CardStatus } from '../store/types'

const selectCards = (state: State) => state.cards
const selectFilters = (state: State, props: CardsPageProps) => {
  // console.log({ props })

  return props.filters
}

const cardsByStatus = createSelector(selectCards, selectFilters, (cards, filters) => {
  console.log(filters?.arrhythmias)
  const filteredCards = cards
    .filter(({ patientName }) => patientName.toLowerCase().includes(filters?.name ?? ''))
    .filter(({ arrhythmias }) =>
      arrhythmias
        .toString()
        .toLowerCase()
        .includes(filters?.arrhythmias ?? '')
    )

  const pending = filteredCards.filter(({ status }) => status === CardStatus.PENDING)
  const rejected = filteredCards.filter(({ status }) => status === CardStatus.REJECTED)
  const done = filteredCards.filter(({ status }) => status === CardStatus.DONE)

  return { pending, rejected, done }
})

export default cardsByStatus
