import {
  DISPLAY_NAVIGATION,
  HIDE_NAVIGATION,
  NAVIGATION_DISPLAYED,
  NAVIGATION_HIDDEN,
} from '../src/constants';

import {
  displayNavigation,
  hideNavigation,
  navigationDisplayed,
  navigationHidden,
} from '../src/actions';

const mockReducerKey = 'mockReducerKey';
const mockAnimationDuration = 10;

test('displayNavigation action creator creates appropriate action', () => {
  expect(displayNavigation(mockReducerKey, mockAnimationDuration)).toEqual({
    type: DISPLAY_NAVIGATION,
    reducerKey: mockReducerKey,
    animationDuration: mockAnimationDuration,
  });
});
test('hideNavigation action creator creates appropriate action', () => {
  expect(hideNavigation(mockReducerKey, mockAnimationDuration)).toEqual({
    type: HIDE_NAVIGATION,
    reducerKey: mockReducerKey,
    animationDuration: mockAnimationDuration,
  });
});
test('navigationDisplayed action creator creates appropriate action', () => {
  expect(navigationDisplayed(mockReducerKey, mockAnimationDuration)).toEqual({
    type: NAVIGATION_DISPLAYED,
    reducerKey: mockReducerKey,
  });
});
test('navigationHidden action creator creates appropriate action', () => {
  expect(navigationHidden(mockReducerKey, mockAnimationDuration)).toEqual({
    type: NAVIGATION_HIDDEN,
    reducerKey: mockReducerKey,
  });
});
