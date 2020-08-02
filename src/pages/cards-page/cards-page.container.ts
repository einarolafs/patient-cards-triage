/* eslint-disable filenames/match-regex */

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { State } from '../../store/types'
import { getCards } from '../../store/actions'
import { cardsByStatus } from '../../selectors'

import CardsPage from './cards-page'

const mapStateToProps = (state: State) => ({
  cards: cardsByStatus(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ getCards }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage)
