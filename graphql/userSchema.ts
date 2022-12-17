import { gql } from "apollo-server";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
import { ContextType } from "./context";
import { APP_SECRET } from "../utils/auth";

export const userTypeDefs = gql`
  type User {
    id: Int!
    email: String!
    name: String!
    password: String!
    role: Role!
  }

  enum Role {
    urgent
    normal
    low
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createUser(
      email: String!
      name: String!
      password: String!
      role: Role
    ): User!
    deleteUser(id: Int!): User!
    addRole(id: Int!, role: Role): User!
  }
`;

export const userResolvers = {
  Query: {
    getUsers: async (_obj: any, _args: any, context: ContextType, _info: any) => {
      const users = await context.prisma.user.findMany();
      return users;
    },
  },
  Mutation: {
    signup: async (
      parent: unknown,
      args: { email: string; password: string; name: string },
      context: ContextType
    ) => {
      const password = await hash(args.password, 10);
      const user = await context.prisma.user.create({
        data: { ...args, password },
      });
      const token = sign({ userId: user.id }, APP_SECRET);
      return {
        token,
        user,
      };
    },
    login: async (
      parent: unknown,
      args: { email: string; password: string },
      context: ContextType
    ) => {
      const user = await context.prisma.user.findUnique({
        where: { email: args.email },
      });
      if (!user) {
        throw new Error("No such user found");
      }
      const valid = await compare(args.password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      const token = sign({ userId: user.id }, APP_SECRET);
      return {
        token,
        user,
      };
    },
    addRole: async (_obj: any, _args: any, context: ContextType, _info: any) => {
      const user = await context.prisma.user.update({
        where: {
          id: _args.id,
        },
        data: {
          role: _args.role,
        },
      });
      return user;
    },
  },
};
