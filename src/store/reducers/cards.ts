import * as types from '../types'

const initial: types.NormalizedCardInterface[] = []

type Action = {
  type: string
  payload: types.NormalizedCardInterface[]
}

const updateCardStatus = (cards, payload) =>
  cards.map((card) => {
    if (card.id === payload.id) {
      return { ...card, status: payload.status }
    }

    return card
  })

const cards = (state = initial, action: Action) => {
  switch (action.type) {
    case types.ADD_CARDS:
      return [...state, ...action.payload]
    case types.UPDATE_CARD_STATUS:
      return updateCardStatus(state, action.payload)
    case types.DATA_FETCH_FAILED:
      return { ...action.payload }
    default:
      return state
  }
}

export default cards
