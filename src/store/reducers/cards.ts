import * as types from '../types'

const initial: types.NormalizedCardInterface[] = []

type Action = {
  type: string,
  data: types.NormalizedCardInterface[]
}

const cards = (state = initial, action: Action) => {
  switch (action.type) {
    case types.ADD_CARDS:
      return [...state, ...action.data]
    case types.DATA_FETCH_FAILED:
      return { ...action.data }
    default:
      return state
  }
}

export default cards
