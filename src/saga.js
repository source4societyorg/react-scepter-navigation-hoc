import { delay } from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import { valueOrDefault } from '@source4society/scepter-utility-lib';
import { sagaHandler as sagaHandlerFunction } from '@source4society/react-authapp-container/lib/saga';
import { HIDE_NAVIGATION, DISPLAY_NAVIGATION } from './constants';
import { navigationHidden, navigationDisplayed } from './actions';

export function* hideNavigationSagaCallbackFunction(action, injectedNavigationHidden) {
  const navigationHiddenActionCreator = valueOrDefault(injectedNavigationHidden, navigationHidden);
  yield delay(action.animationDuration);
  yield put(navigationHiddenActionCreator(action.reducerKey));
}

export function* displayNavigationSagaCallbackFunction(action, injectedNavigationDisplayed) {
  const navigationDisplayedActionCreator = valueOrDefault(injectedNavigationDisplayed, navigationDisplayed);
  yield delay(action.animationDuration);
  yield put(navigationDisplayedActionCreator(action.reducerKey));
}

export const hideNavigationSagaGenerator = (reducerKey) => function* hideNavigationSagaSequence(action, injectedSagaHandler, injectedSagaCallback) {
  const sagaHandler = valueOrDefault(injectedSagaHandler, sagaHandlerFunction);
  const hideNavigationSagaCallback = valueOrDefault(injectedSagaCallback, hideNavigationSagaCallbackFunction);
  yield* sagaHandler(action, hideNavigationSagaCallback, reducerKey);
};

export const displayNavigationSagaGenerator = (reducerKey) => function* hideNavigationSagaSequence(action, injectedSagaHandler, injectedSagaCallback) {
  const sagaHandler = valueOrDefault(injectedSagaHandler, sagaHandlerFunction);
  const displayNavigationSagaCallback = valueOrDefault(injectedSagaCallback, displayNavigationSagaCallbackFunction);
  yield* sagaHandler(action, displayNavigationSagaCallback, reducerKey);
};

export default function* navigationManagerSaga({ reducerKey }, injectedHideNavigationSaga, injectedDisplayNavigationSaga) {
  const hideNavigationSaga = valueOrDefault(injectedHideNavigationSaga, hideNavigationSagaGenerator);
  const displayNavigationSaga = valueOrDefault(injectedDisplayNavigationSaga, displayNavigationSagaGenerator);
  yield takeEvery(HIDE_NAVIGATION, hideNavigationSaga(reducerKey));
  yield takeEvery(DISPLAY_NAVIGATION, displayNavigationSaga(reducerKey));
}
