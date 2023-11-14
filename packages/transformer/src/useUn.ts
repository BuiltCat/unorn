import {useContext} from 'react';
import { UnContext } from './context';

export const useUn = () => {
	return useContext(UnContext);
};