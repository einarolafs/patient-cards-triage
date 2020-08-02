/* eslint-disable filenames/match-regex */

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { getCards } from '../../store/actions'

import CardsPage from './cards-page'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ getCards }, dispatch)
})

export default connect(null, mapDispatchToProps)(CardsPage)
