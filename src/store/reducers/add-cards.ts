import * as types from '../types'

const initial: types.CardInterface[] = []

type Action = {
  type: string,
  data: types.CardInterface[]
}

const addCards = (state = initial, action: Action) => {
  switch (action.type) {
    case types.ADD_CARDS:
      return [...state, ...action.data]
    case types.DATA_FETCH_FAILED:
      return { ...action.data }
    default:
      return state
  }
}

export default addCards
