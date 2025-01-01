import { useContext } from 'react';
import { IntlContext, IntlContextProps } from './IntlContext';

export const useIntlContext = (): IntlContextProps => useContext(IntlContext);
