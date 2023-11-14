import { createContext } from 'react';

export const UnContext = createContext((str: string): Record<string, unknown> => ({} as Record<string, unknown>));
