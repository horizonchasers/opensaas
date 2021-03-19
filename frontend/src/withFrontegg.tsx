import React, { ComponentType } from 'react';
import { AuthPlugin } from '@frontegg/react-auth';
import { AuditsPlugin } from '@frontegg/react-audits';
import { ConnectivityPlugin } from '@frontegg/react-connectivity';
import { ContextHolder } from '@frontegg/rest-api';
import { ContextOptions, PluginConfig, FronteggProvider } from '@frontegg/react-core';
import { FronteggProvider as LegacyProvider, ContextOptions as LegacyOptions } from '@frontegg/react';

const { REACT_APP_API_GW_URL } = process.env;
console.log(`Initialized with ${REACT_APP_API_GW_URL} as gw url`);

/**
 * use this object to config Frontegg global context object
 */
const contextOptions: ContextOptions = {
  baseUrl: REACT_APP_API_GW_URL || 'http://localhost:8080',
  requestCredentials: 'include',
};

const legacyContextOptions: LegacyOptions = {
  baseUrl: REACT_APP_API_GW_URL || 'http://localhost:8080',
  requestCredentials: 'include',
  tokenResolver: () => {
    return ContextHolder.getAccessToken() || '';
  },
};

const plugins: PluginConfig[] = [
  // add frontegg plugin here
  AuthPlugin({
    header: <img alt='logo' src='images/datavoss-black-blue.png' />,
    /* auth options, find more information at https://github.com/frontegg/frontegg-react/tree/master/packages/auth */
  }),
  ConnectivityPlugin(),
  AuditsPlugin(),
];

/**
 *  Wrap you entire application with this HOC.
 *  NOTE: Make sure to remove any BrowserRouter in your application if you use ```withRouter``` option
 */
export const withFrontegg = <P extends {}>(AppComponent: ComponentType<P>) => (props: P) => {
  return (
    <FronteggProvider plugins={plugins} context={contextOptions}>
      <LegacyProvider contextOptions={legacyContextOptions}>
        <AppComponent {...props} />
      </LegacyProvider>
    </FronteggProvider>
  );
};
