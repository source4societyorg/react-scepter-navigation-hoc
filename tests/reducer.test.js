import { fromJS } from 'immutable';
import { HIDE_NAVIGATION, NAVIGATION_HIDDEN, DISPLAY_NAVIGATION, NAVIGATION_DISPLAYED } from '../src/constants';
import navigationReducer, { initialState, hideNavigationReducer, navigationHiddenReducer, displayNavigationReducer, navigationDisplayedReducer } from '../src/reducer';

const mockState = initialState;
const mockReducerKey = 'mockReducerKey';
const mockAction = { hasProperties: 'mockAction', reducerKey: mockReducerKey };

const mockNamespacedReducerHandler = (state, action, reducerKey, reducerCallback) => {
  expect(state).toEqual(mockState);
  expect(action).toEqual(mockAction);
  expect(reducerKey).toEqual(mockReducerKey);
  return reducerCallback(state, action, reducerKey);
};

test('initialState is set properly', () => {
  expect(initialState).toEqual(fromJS({
    isAnimating: false,
    isHidden: false,
  }));
});

test('hideNavigationReducer sets state properly', () => {
  const reducedState = mockState.set('isAnimating', true);
  expect(hideNavigationReducer(mockState, mockAction, mockReducerKey, mockNamespacedReducerHandler)).toEqual(reducedState);
});

test('navigationHiddenReducer sets state properly', () => {
  const reducedState = mockState
    .set('isAnimating', false)
    .set('isHidden', true);

  expect(navigationHiddenReducer(mockState, mockAction, mockReducerKey, mockNamespacedReducerHandler)).toEqual(reducedState);
});

test('displayNavigationReducer sets state properly', () => {
  const reducedState = mockState
    .set('isAnimating', true);

  expect(displayNavigationReducer(mockState, mockAction, mockReducerKey, mockNamespacedReducerHandler)).toEqual(reducedState);
});

test('navigationDisplayedReducer sets state properly', () => {
  const reducedState = mockState
    .set('isAnimating', false)
    .set('isHidden', false);

  expect(navigationDisplayedReducer(mockState, mockAction, mockReducerKey, mockNamespacedReducerHandler)).toEqual(reducedState);
});

test('navigationReducer calls the right reducer for each state', () => {
  const mockActionHideNavigation = { type: HIDE_NAVIGATION, reducerKey: mockReducerKey };
  const mockActionNavigationHidden = { type: NAVIGATION_HIDDEN, reducerKey: mockReducerKey };
  const mockActionDisplayNavigation = { type: DISPLAY_NAVIGATION, reducerKey: mockReducerKey };
  const mockActionNavigationDisplayed = { type: NAVIGATION_DISPLAYED, reducerKey: mockReducerKey };
  const mockCorrectReducer = (state, action, reducerKey) => {
    expect(state).toEqual(mockState);
    expect(action).toBeDefined();
    expect(reducerKey).toEqual(mockReducerKey);
    return mockState;
  };
  const mockIncorrectReducer = () => { throw new Error('Incorrect reducer called'); };
  expect(navigationReducer(mockReducerKey)(mockState, mockActionHideNavigation, mockCorrectReducer, mockIncorrectReducer, mockIncorrectReducer, mockIncorrectReducer)).toEqual(mockState);
  expect(navigationReducer(mockReducerKey)(mockState, mockActionNavigationHidden, mockIncorrectReducer, mockCorrectReducer, mockIncorrectReducer, mockIncorrectReducer)).toEqual(mockState);
  expect(navigationReducer(mockReducerKey)(mockState, mockActionDisplayNavigation, mockIncorrectReducer, mockIncorrectReducer, mockCorrectReducer, mockIncorrectReducer)).toEqual(mockState);
  expect(navigationReducer(mockReducerKey)(mockState, mockActionNavigationDisplayed, mockIncorrectReducer, mockIncorrectReducer, mockIncorrectReducer, mockCorrectReducer)).toEqual(mockState);
  expect(navigationReducer(mockReducerKey)(mockState, {}, mockIncorrectReducer, mockIncorrectReducer, mockIncorrectReducer, mockIncorrectReducer)).toEqual(mockState);
});

