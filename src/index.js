import React from 'react';
import { valueOrDefault } from '@source4society/scepter-utility-lib';
import { reducerInjector, sagaInjector } from '@source4society/scepter-webui-utilities';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsHidden, makeSelectIsAnimating } from './selectors';
import { defaultProps, propTypes } from './props';
import reducer from './reducer';
import saga from './saga';

export class NavigationManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {}
  render() {
    return null;
  }
}

NavigationManager.defaultProps = defaultProps;
NavigationManager.propTypes = propTypes;

export const mapStateToProps = (state, ownProps, injectedMakeSelectIsHidden, injectedMakeSelectIsAnimating) => {
  const makeSelectIsHiddenSelector = valueOrDefault(injectedMakeSelectIsHidden, makeSelectIsHidden);
  const makeSelectIsAnimatingSelector = valueOrDefault(injectedMakeSelectIsAnimating, makeSelectIsAnimating);
  return createStructuredSelector({
    isHidden: makeSelectIsHiddenSelector(ownProps.reducerKey),
    isAnimating: makeSelectIsAnimatingSelector(ownProps.reducerKey),
  });
};

export const withReducer = reducerInjector({ key: 'navigationManager', reducer, isNamespaced: true });
export const withSaga = sagaInjector({ key: 'navigationManager', saga });
export const withConnect = connect(mapStateToProps);

export default compose(
  withReducer,
  withConnect,
)(NavigationManager);
