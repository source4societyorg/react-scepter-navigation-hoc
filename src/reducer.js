import { fromJS } from 'immutable';
import { valueOrDefault } from '@source4society/scepter-utility-lib';
import { namespacedReducerHandler as namespacedReducerHandlerFunction } from '@source4society/scepter-reducer-lib';
import { HIDE_NAVIGATION, NAVIGATION_HIDDEN, DISPLAY_NAVIGATION, NAVIGATION_DISPLAYED } from './constants';

export const initialState = fromJS({
  isAnimating: false,
  isHidden: false,
});

export const hideNavigationReducer = (state, action, reducerKey, injectedNamespacedReducerHandler) => {
  const namespacedReducerHandler = valueOrDefault(injectedNamespacedReducerHandler, namespacedReducerHandlerFunction);
  const reducer = () => state.set('isAnimating', true);
  return namespacedReducerHandler(state, action, reducerKey, reducer);
};

export const navigationHiddenReducer = (state, action, reducerKey, injectedNamespacedReducerHandler) => {
  const namespacedReducerHandler = valueOrDefault(injectedNamespacedReducerHandler, namespacedReducerHandlerFunction);
  const reducer = () =>
    state
      .set('isAnimating', false)
      .set('isHidden', true);
  return namespacedReducerHandler(state, action, reducerKey, reducer);
};

export const displayNavigationReducer = (state, action, reducerKey, injectedNamespacedReducerHandler) => {
  const namespacedReducerHandler = valueOrDefault(injectedNamespacedReducerHandler, namespacedReducerHandlerFunction);
  const reducer = () =>
    state
      .set('isAnimating', true);
  return namespacedReducerHandler(state, action, reducerKey, reducer);
};

export const navigationDisplayedReducer = (state, action, reducerKey, injectedNamespacedReducerHandler) => {
  const namespacedReducerHandler = valueOrDefault(injectedNamespacedReducerHandler, namespacedReducerHandlerFunction);
  const reducer = () =>
    state
      .set('isAnimating', false)
      .set('isHidden', false);
  return namespacedReducerHandler(state, action, reducerKey, reducer);
};

export const navigationReducer = (reducerKey) => (
  injectedState,
  action,
  injectedHideNavigationReducer,
  injectedNavigationHiddenReducer,
  injectedDisplayNavigationReducer,
  injectedNavigationDisplayedReducer,
) => {
  const hideNavigation = valueOrDefault(injectedHideNavigationReducer, hideNavigationReducer);
  const navigationHidden = valueOrDefault(injectedNavigationHiddenReducer, navigationHiddenReducer);
  const displayNavigation = valueOrDefault(injectedDisplayNavigationReducer, displayNavigationReducer);
  const navigationDisplayed = valueOrDefault(injectedNavigationDisplayedReducer, navigationDisplayedReducer);
  const state = valueOrDefault(injectedState, initialState);
  switch (action.type) {
    case HIDE_NAVIGATION:
      return hideNavigation(state, action, reducerKey);
    case NAVIGATION_HIDDEN:
      return navigationHidden(state, action, reducerKey);
    case DISPLAY_NAVIGATION:
      return displayNavigation(state, action, reducerKey);
    case NAVIGATION_DISPLAYED:
      return navigationDisplayed(state, action, reducerKey);
    default:
      return state;
  }
};

export default navigationReducer;
