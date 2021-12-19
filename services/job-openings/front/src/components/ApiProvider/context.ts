import { createContext } from 'react';
import { useApiInstance } from '../../services/api';

type ApiContextType = ReturnType<typeof useApiInstance>;
// @ts-ignore
export const ApiContext = createContext<ApiContextType>(null);
