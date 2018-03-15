import React from 'react';
import { shallow } from 'enzyme';
import { NavigationManager, mapStateToProps } from '../src/index';

test('NavigationManager renders without errors', () => {
  shallow(<NavigationManager />);
});

test('mapStateToProps creates a structured selector', () => {
  const mockReducerKey = 'mockReducerKey';
  const mockState = { hasProperties: 'mockState' };
  const mockProps = { hasProperties: 'mockProps', reducerKey: mockReducerKey };
  const mockMakeSelectIsHidden = (reducerKey) => {
    expect(reducerKey).toEqual(mockReducerKey);
    return () => 'mockIsHidden';
  };
  const mockMakeSelectIsAnimating = (reducerKey) => {
    expect(reducerKey).toEqual(mockReducerKey);
    return () => 'mockIsAnimating';
  };
  expect(mapStateToProps(mockState, mockProps, mockMakeSelectIsHidden, mockMakeSelectIsAnimating)()).toEqual({
    isHidden: 'mockIsHidden',
    isAnimating: 'mockIsAnimating',
  });
});
