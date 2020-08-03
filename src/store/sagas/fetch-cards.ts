import { call, put, takeLatest } from 'redux-saga/effects'
import camelcase from 'camelcase'

import { ADD_CARDS, DATA_FETCH_FAILED, FETCH_CARDS_REQUESTED, CardInterface } from '../types'
import { getCardsData } from '../../services'

const normaliseData = (cards: CardInterface[]) => cards.map((card) => {
  const statusToLowerCase = { ...card, status: card.status.toLowerCase() }

  const keysToCamelCase = Object.entries(statusToLowerCase).map(item => [camelcase(item[0]), item[1]])

  return Object.fromEntries(keysToCamelCase)
})

function *fetchCardsData ({ url }: {url: string}) {
  try {
    const data = yield call(getCardsData, { url })

    const normaliseCardData = normaliseData(data)

    yield put({ type: ADD_CARDS, payload: normaliseCardData })
  }
  catch (e) {
    yield put({ type: DATA_FETCH_FAILED, payload: { error: e.message } })
  }
}

function *fetchCards () {
  yield takeLatest(FETCH_CARDS_REQUESTED, fetchCardsData)
}

export default fetchCards
