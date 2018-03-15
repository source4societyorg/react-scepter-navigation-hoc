import { fromJS } from 'immutable';
import { selectNavigationManager, makeSelectIsHidden, makeSelectIsAnimating } from '../src/selectors';

const mockReducerKey = 'mockReducerKey';
const mockIsHidden = 'mockIsHidden';
const mockIsAnimating = 'mockIsAnimating';

test('selectNavigationManager returns the selector for a specific navigationManager when passed a reducer key', () => {
  const mockNavigationManagerState = 'mockNavigationManager';
  const mockState = fromJS({ mockReducerKey: mockNavigationManagerState });
  expect(selectNavigationManager(mockReducerKey)(mockState)).toEqual(mockNavigationManagerState);
});

test('makeSelectIsHidden returns the selector for the isHidden property of a specific navigationManager state', () => {
  const mockNavigationManagerState = { isHidden: mockIsHidden };
  const mockState = fromJS({ mockReducerKey: mockNavigationManagerState });
  expect(makeSelectIsHidden(mockReducerKey)(mockState)).toEqual(mockIsHidden);
});

test('makeSelectIsAnimating returns the selector for the isAnimating property of a specific navigationManager state', () => {
  const mockNavigationManagerState = { isAnimating: mockIsAnimating };
  const mockState = fromJS({ mockReducerKey: mockNavigationManagerState });
  expect(makeSelectIsAnimating(mockReducerKey)(mockState)).toEqual(mockIsAnimating);
});
