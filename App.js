import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Provider, connect } from 'react-redux';
import { Home } from './containers/Home'
import { persistStore } from 'redux-persist';
import store from './store';
import RootNavigator from './navigation/AppNavigator'

function connectWithStore(stored, WrappedComponent, ...args) {
  const ConnectedWrappedComponent = connect(...args)(WrappedComponent);
  return function (props) {
    return <ConnectedWrappedComponent {...props} store={stored}/>;
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      loggedIn: false,
    };
  }

  componentDidMount(){
    persistStore(store);
  }

  render() {
    return (
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => {
  const localSettingsNF = state.localSettingsNF.toJS();
  return { localSettingsNF };
};

export default connectWithStore(store, App, mapStateToProps);
