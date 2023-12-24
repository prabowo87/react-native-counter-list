// App.js

import React from 'react';

import { Provider } from 'react-redux';
import CounterList from './counterList';
import store from './store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <CounterList />
      </Provider>
    
    </>
  );
};

export default App;
