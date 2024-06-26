A NODE application which processes data from the Microsoft Graph API.

The app obtains an access token from Azure Active Directory using the tenant ID, 
client ID, and client secret (stored in the.env file).  
Then it will: 
- list groups from the Microsoft Graph API. 
- For each group returned by the API, it stores a JSON file in a local directory structured as follows:
```/MSGraph/Groups/{group name}.json```
- Output the location and count of the stored groups to the console.
- The application displays paginated results. The number of results depends on the value passed to the **listGroups** method (0 for disabling pagination)

## Prerequisites:
- Node >= v20.10.0
- NPM >= 10.2.3

## Setup:
**1) Install dependencies**
```shell
npm install
```
**2) Change your environment variables**
```
CLIENT_ID=<YOUR_CLIENT_ID>
CLIENT_SECRET=<YOUR_CLIENT_SECRET>
TENANT_ID=<YOUR_TENANT_ID>
```

**3) Start the application**
```shell
npm start
```




