import React, { FunctionComponent } from 'react';
import { ApiContext } from './context';
import { useApiInstance } from '../../services/api';

const AuthProvider: FunctionComponent = (props) => {
  const api = useApiInstance();
  return (
    <ApiContext.Provider value={api}>{props?.children}</ApiContext.Provider>
  );
};

export default AuthProvider;
