import { LoginType, MsalAuthProvider } from 'react-aad-msal'

const config = {
  auth: {
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AUTH_TENANT}`,
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URL,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
}

const authenticationParameters = {
  //scopes: (process.env.REACT_APP_AUTH_SCOPES || '').split(','),
}

const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin,
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)
