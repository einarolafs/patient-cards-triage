import { createSelector } from 'reselect'

import { State } from '../store/types'

import sortByDate from './sort-by-date'
import sortByStars from './sort-by-stars'

const selectRepositories = (state: State) => state.repositories

const privateRepositories = createSelector(
  selectRepositories,
  (repositories) => {
    const privateRepos = repositories.filter((repo: {private: boolean}) => repo.private)

    return privateRepos.sort(sortByDate).sort(sortByStars)
  }
)

export default privateRepositories
