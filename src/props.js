import PropTypes from 'prop-types';
export const defaultProps = {
  reducerKey: 'navigationManager',
};
export const propTypes = {
  reducerKey: PropTypes.string,
  isAnimating: PropTypes.bool,
  isHidden: PropTypes.bool,
};
