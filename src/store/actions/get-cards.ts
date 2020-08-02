import { FETCH_CARDS_REQUESTED } from '../types'

const getCards = () => ({
  type: FETCH_CARDS_REQUESTED,
  url: 'http://localhost:8000/cards'
})

export default getCards
