# react-scepter-navigation-hoc
A react based navigation component state manager for scepter projects 

[![scepter-logo](http://res.cloudinary.com/source-4-society/image/upload/v1519221119/scepter_hzpcqt.png)](https://github.com/source4societyorg/SCEPTER-core)

[![redux-logo](https://raw.githubusercontent.com/reactjs/redux/master/logo/logo-title-dark.png)](https://github.com/reactjs/redux)

[![react-boilerplate](https://github.com/react-boilerplate/brand/blob/master/assets/logo.png)](https://gihub.com/react-boilerplate)

[![airbnb-codestyle](https://camo.githubusercontent.com/1c5c800fbdabc79cfaca8c90dd47022a5b5c7486/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d616972626e622d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265)](https://github.com/airbnb/javascript)

[![Build Status](https://travis-ci.org/source4societyorg/react-scepter-navigation-hoc.svg?branch=master)](https://travis-ci.org/source4societyorg/react-scepter-navigation-hoc)

[![codecov](https://codecov.io/gh/source4societyorg/react-scepter-navigation-hoc/branch/master/graph/badge.svg)](https://codecov.io/gh/source4societyorg/react-scepter-navigation-hoc)

# Installation

    npm install @source4society/react-scepter-navigation-hoc

or

    yarn install @source4society/react-scepter-navigation-hoc

# Usage

Add the HOC to the container which will display your navigation component [react-scepter-navigation-menu](https://github.com/source4societyorg/react-scepter-navigation-menu) and (if using) your [react-scepter-hamburger-menu](https://github.com/source4societyorg/react-scepter-hamburger-menu).

Give the same reducerKey prop to navigation component, hamburger menu, and this HOC. Clicking on the Hamburger menu will dispatch the proper events which will allow the HOC to manage the `isAnimating` and `isHidden` states. The following states are reduced:

    HIDE_NAVIGATION // Sets isAnimating to true and kicks off a saga to wait animationDuration seconds before dispatching the NAVIGATION_HIDDEN action
    NAVIGATION_HIDDEN // Sets isAnimating to false and isHidden to true
    DISPLAY_NAVIGATION // Sets isAnimating to true and kicks off a saga to wait animationDuration seconds before dispatching the NAVIGATION_DISPLAYED event
    NAVIGATION_DISPLAYED // Sets isAnimating to false and isHidden to false (initial state)

The following action creators can be dispatched:

    hideNavigation(reducerKey, animationDuration) // Dispatches the HIDE_NAVIGATION action.
    navigationHidden(reducerKey) // Dispatches the NAVIGATION_HIDDEN action.
    displayNavigation(reducerKey, animationDuration) // Dispatches the DISPLAY_NAVIGATION action.
    navigationDisplayed(reducerKey) // Dispatches the NAVIGATION_DISPLAYED action.
