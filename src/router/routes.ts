import * as Pages from '../pages'

import paths from './paths'

interface Routes {
  [key: string]: {
    path: string,
    page: React.ComponentClass<any, any> | React.FunctionComponent<any>,
  }
}

const routes: Routes = {
  root: {
    path: paths.root,
    page: Pages.StartPage
  },
  cards: {
    path: paths.cards,
    page: Pages.Cards
  }
}

export default routes
