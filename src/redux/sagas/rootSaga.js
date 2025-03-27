import { all } from 'redux-saga/effects'
import { userSaga } from './userSaga'
import { commonSaga } from './commonSaga'
import { categorySaga } from './categorySaga'
import { teamSaga } from './teamSaga'
import { leagueSaga } from './leagueSaga'
import { gameSaga } from './gameSaga'
import { customerSaga } from './customerSaga'

export function* rootSaga() {
  yield all([
    customerSaga(),
    gameSaga(),
    leagueSaga(),
    teamSaga(),
    categorySaga(),
    commonSaga(),
    userSaga(),
  ])
}
