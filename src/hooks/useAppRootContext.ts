'use client';

import { useContext } from 'react';

import { AppRootContext, AppRootContextInterface } from 'components/Service/AppRoot/AppRootContext';

const DEFAULT_CONTEXT: AppRootContextInterface = {
  platform: 'base',
  appearance: 'light',
  portalContainer: { current: null },
  isRendered: false,
};

export const useAppRootContext = () => {
  const appRootContext = useContext(AppRootContext);

  // Return default context when not inside AppRoot (e.g., inside portals)
  if (!appRootContext.isRendered) {
    return DEFAULT_CONTEXT;
  }

  return appRootContext;
};
