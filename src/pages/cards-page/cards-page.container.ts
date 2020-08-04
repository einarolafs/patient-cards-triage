/* eslint-disable filenames/match-regex */

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { State } from '../../store/types'
import { getCards, addPage, updatePage, changeCardStatus } from '../../store/actions'
import { cardsByStatus, cardsByKeyValue } from '../../selectors'

import CardsPage from './cards-page'

const mapStateToProps = (state: State) => {
  const { filters, dragging } = state.pages?.cards ?? {}
  const cards = cardsByKeyValue(state)
  const draggingStatus = cards[dragging]?.status

  return {
    cardsByStatus: cardsByStatus(state, { filters }),
    cards,
    dragging,
    arrhythmias: state.arrhythmias,
    filters,
    draggingStatus,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ getCards, addPage, updatePage, changeCardStatus }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage)
