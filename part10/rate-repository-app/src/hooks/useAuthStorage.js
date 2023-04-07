import {useContext} from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

/**
 * @returns {AuthStorage|null}
 */
export const useAuthStorage = () => {
  return useContext(AuthStorageContext);
}