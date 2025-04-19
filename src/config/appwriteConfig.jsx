import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") 
  .setProject("67eabd47002f05d1b097");

const account = new Account(client);

export { client, account }; 
