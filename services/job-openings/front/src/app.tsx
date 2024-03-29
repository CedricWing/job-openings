import React from 'react';
import Main from './pages/Main';
import ApiProvider from './components/ApiProvider';
// Wrapper class emcompassing provider and pages
const App = () => (
  <ApiProvider>
    <Main />
  </ApiProvider>
);
export default App;
