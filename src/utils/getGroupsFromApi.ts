import dotenv from "dotenv";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { ClientSecretCredential } from "@azure/identity";

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const credential = new ClientSecretCredential(
  process.env.TENANT_ID as string,
  process.env.CLIENT_ID as string,
  process.env.CLIENT_SECRET as string,
);

const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ["https://graph.microsoft.com/.default"],
});

const client = Client.initWithMiddleware({ authProvider: authProvider });

export const getGroupsFromApi = async () => {
  try {
    const result = await client.api("/groups").get();
    return result?.value;
  } catch (e) {
    throw e;
  }
};
