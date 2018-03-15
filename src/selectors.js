import { createSelector } from 'reselect';
import { valueOrDefault } from '@source4society/scepter-utility-lib';

export const selectNavigationManager = (reducerKey) => {
  const key = valueOrDefault(reducerKey, 'navigationManager');
  return (state) => state.get(key);
};

export const makeSelectIsHidden = (reducerKey) => createSelector(
  selectNavigationManager(reducerKey),
  (navigationManagerState) => navigationManagerState.get('isHidden'),
);

export const makeSelectIsAnimating = (reducerKey) => createSelector(
  selectNavigationManager(reducerKey),
  (navigationManagerState) => navigationManagerState.get('isAnimating'),
);
