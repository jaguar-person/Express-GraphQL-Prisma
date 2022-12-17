import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { userTypeDefs, userResolvers } from "./userSchema";
import { todoTypeDefs, todoResolvers } from "./todoSchema";
import { doneTypeDefs, doneResolvers } from "./doneSchema";

export const typeDefs = mergeTypeDefs([userTypeDefs, todoTypeDefs, doneTypeDefs]);
export const resolvers = mergeResolvers([userResolvers, todoResolvers, doneResolvers]);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})