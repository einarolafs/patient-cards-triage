import { createSelector } from 'reselect'

import { State } from '../store/types'

import sortByDate from './sort-by-date'
import sortByStars from './sort-by-stars'

const selectRepositories = (state: State) => state.repositories

const publicRepositories = createSelector(
  selectRepositories,
  (repositories) => {
    const publicRepos = repositories.filter((repo: {private: boolean}) => !repo.private)

    return publicRepos.sort(sortByDate).sort(sortByStars)
  }
)

export default publicRepositories
