import React from 'react';
import Main from './pages/Main';
import ApiProvider from './components/ApiProvider';

const App = () => (
  <ApiProvider>
    <Main />
  </ApiProvider>
);
export default App;
