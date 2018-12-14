import { combineReducers } from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import AppNavigator from "../../navigation";

const navReducer = createNavigationReducer(AppNavigator);

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        nav: navReducer,
        firebase: firebaseStateReducer,
        ...asyncReducers
    })
};

export default makeRootReducer
