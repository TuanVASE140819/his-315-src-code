import { all } from 'redux-saga/effects'
import { userSaga } from './userSaga'
import { commonSaga } from './commonSaga'
import { categorySaga } from './categorySaga'
import { teamSaga } from './teamSaga'

export function* rootSaga() {
  yield all([userSaga(), commonSaga(), categorySaga(), teamSaga()])
}
