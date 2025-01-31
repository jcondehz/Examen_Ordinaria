import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";
import { MongoClient } from "mongodb";
import { schema } from "./schema.ts";
import { resolvers } from "./resolver.ts"
import {Model} from "./types.ts"



const MONGO_URL =
   Deno.env.get("MONGO_URL") ;

if (!MONGO_URL) {
  console.error("MONGO URL API KEY NOT WORKING");
}

const dbuser = new MongoClient(MONGO_URL);
await dbuser.connect();
console.info("Connected to MongoDB");
const db=dbuser.db("Cosa")
const collection = db.collection<Model>("Cosa")

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });

const { url } = await startStandaloneServer(server, {
    context: async () => (await {
        //Collection
    }),
    listen: { port: 8080 },
});
  
console.info(`Server ready at ${url}`);