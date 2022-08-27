import {CommonActions} from '@react-navigation/native';

let navigator;

const setTopLevelNavigator = navigatorRef => {
  navigator = navigatorRef;
};

const navigateTo = (name, params = {}) => {
  if (navigator) {
    navigator.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
};

const navigateAndReset = (routeName, params = {}) => {
  navigator.reset({
    index: 0,
    routes: [{name: routeName, params}],
  });
};

const navigateAndResetWithMultipleRoute = (routes = []) => {
  navigator.reset({
    index: 0,
    routes,
  });
};

const navigateAndResetWithMultipleActions = (actions = []) => {
  navigator.reset({
    index: 0,
    actions,
  });
};

export {
  setTopLevelNavigator,
  navigateTo,
  navigator,
  navigateAndReset,
  navigateAndResetWithMultipleRoute,
  navigateAndResetWithMultipleActions,
};
