import { call, take, cancel, fork } from 'redux-saga/effects';
import { endsWithSegment } from 'router5.helpers';
import { actionTypes } from 'redux-router5';

export function* routerSaga(routingMap) {
  let sagaTask = null;

  while (true) {
    const { payload: { route: name } } = yield take(actionTypes.TRANSITION_SUCCESS);

    const matchedRoute = Object
      .keys(routingMap)
      .find(routeName => endsWithSegment(name, routeName));

    if (sagaTask) {
      yield cancel(sagaTask);
      sagaTask = null;
    }

    if (matchedRoute) {
      const matchedSaga = routingMap[matchedRoute];
      sagaTask = yield fork(matchedSaga);
    }
  }
}

export default function* () {
  yield call(routerSaga, {});
}
