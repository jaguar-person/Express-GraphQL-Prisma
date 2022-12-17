import { gql } from "apollo-server";
import { ContextType } from "./context";

export const doneTypeDefs = gql`
  type Done {
    id: Int!
    title: String!
    description: String!
    userId: Int!
  }

  type Query {
    getAllDoneLists: [Done!]!
  }

  type Mutation {
    createDone: Done!
  }
`;
export const doneResolvers = {
  Query: {
    getAllDoneLists: async (
      _obj: any,
      _args: any,
      context: ContextType,
      _info: any
    ) => {
      const done_lists = await context.prisma.done.findMany();
      return done_lists;
    },
  },
  Mutation: {
    createDone: async (
      _obj: any,
      _args: any,
      context: ContextType,
      _info: any
    ) => {
      const done = await context.prisma.done.create({
        data: {
          title: _args.title,
          description: _args.description,
          userId: _args.userId,
        },
      });
      return done;
    },
  },
};
