// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'u5xfda9147'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-1ao0zpf6.us.auth0.com',            // Auth0 domain
  clientId: 'W6BV2HZ04NSdeauX0WfKy469Rg1g53kU',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
