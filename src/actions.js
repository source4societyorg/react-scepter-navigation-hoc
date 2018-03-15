import { valueOrDefault } from '@source4society/scepter-utility-lib';
import {
  DISPLAY_NAVIGATION,
  HIDE_NAVIGATION,
  NAVIGATION_DISPLAYED,
  NAVIGATION_HIDDEN,
} from './constants';

export const displayNavigation = (reducerKey, injectedAnimationDuration) => {
  const animationDuration = valueOrDefault(injectedAnimationDuration, 0);
  return {
    type: DISPLAY_NAVIGATION,
    reducerKey,
    animationDuration,
  };
};

export const hideNavigation = (reducerKey, injectedAnimationDuration) => {
  const animationDuration = valueOrDefault(injectedAnimationDuration, 0);
  return {
    type: HIDE_NAVIGATION,
    reducerKey,
    animationDuration,
  };
};

export const navigationDisplayed = (reducerKey) => ({
  type: NAVIGATION_DISPLAYED,
  reducerKey,
});

export const navigationHidden = (reducerKey) => ({
  type: NAVIGATION_HIDDEN,
  reducerKey,
});
