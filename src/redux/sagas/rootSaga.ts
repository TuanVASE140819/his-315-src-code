import { all } from 'redux-saga/effects'
import { userSaga } from './userSaga'
import { commonSaga } from './commonSaga'
import { categorySaga } from './categorySaga'
import { teamSaga } from './teamSaga'
import { leagueSaga } from './leagueSaga'
import { gameSaga } from './gameSaga'
import { customerSaga } from './customerSaga'
import { nhanVienSaga } from './nhanVienSaga'
import { partnerSaga } from './partnerSaga'
import { dichvuSaga } from './dichvuSaga'
import { phongkhamSaga } from './phongkhamSaga'

export function* rootSaga() {
  yield all([
    customerSaga(),
    gameSaga(),
    leagueSaga(),
    teamSaga(),
    categorySaga(),
    nhanVienSaga(),
    partnerSaga(),
    dichvuSaga(),
    phongkhamSaga(),
    commonSaga(),
    userSaga(),
  ])
}
