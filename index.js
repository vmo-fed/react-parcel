import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";

import { combineReducers, createStore } from 'redux';

// actions.js
const getUser = user => ({
  type: 'GET_USER',
  user,
});

// reducers.js
const user = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER':
      return action.user;
    default:
      return state;
  }
};

const reducers = combineReducers({
  user,
});

// store.js
function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return store;
}

const store = configureStore();


class HelloMessage extends React.Component {
  componentWillMount(){
    this.props.getUser({name: 'seven'});
  }

  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

const App = connect((state) => ({name: state.user.name}), {
  getUser
})(HelloMessage);


ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById("app"));
