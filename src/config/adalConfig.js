import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
import dotenv from 'dotenv';
dotenv.config();

/* Datos de App Registration Checklistpalletsdes GVD*/
export const endpoint = '5cd85664-99d9-43e3-bc4a-de8c5028b59a'// Client Id
export const adalConfig = {
  tenant: '19b9d3e1-dc68-480f-9b78-08ee81969f2f', // Tenant Id
  clientId: '5cd85664-99d9-43e3-bc4a-de8c5028b59a', // Client Id
  endpoints: {
    api: endpoint,
  },
  cacheLocation: 'localStorage',
};

/* Datos de App Registration Checklistpalletsprd */
/* export const endpoint = '9da566ef-2c55-41a8-a8e5-56793a06cf3b'//CLIENT_ID
export const adalConfig = {
    tenant: 'ee9a0945-3e32-4c74-8986-8e411af80f3c', //DirectoryId Azure
    clientId: '9da566ef-2c55-41a8-a8e5-56793a06cf3b', //CLIENT_ID
    endpoints: {
        api: endpoint,
    },
    cacheLocation: 'localStorage',
}; */


/* DESCOMENTAR PARA PRUEBAS LOCALES */
/* export const endpoint = '641b028d-cd93-460b-9920-8e926eb64d32'//CLIENT_ID

export const adalConfig = {
    tenant: 'fcc13c5c-9023-47c3-bc62-5c34ee1a1e41', //DirectoryId Azure
    clientId: '641b028d-cd93-460b-9920-8e926eb64d32', //CLIENT_ID
    endpoints: {
        api: endpoint,
    },
    cacheLocation: 'localStorage',
}; */



export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options)

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);

