
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import AppNavigator from "./src/navigation";
import createStore from "./src/redux/store";
import NavService from './src/navigation/component/navigationService';

const initialState = { firebase: {} };
const store = createStore(initialState);

export default class App extends Component<Props> {
  render() {
    return (
        <Provider store={store}>
            <AppNavigator ref={navigatorRef => {
                NavService.setTopLevelNavigator(navigatorRef);
            }}/>
        </Provider>
    );
  }
}

