import { gql } from "apollo-server";
import { ContextType } from "./context";

export const todoTypeDefs = gql`
  type Todo {
    id: Int!
    title: String!
    description: String!
    finished: Boolean!
    priority: Priority!
    userId: Int
  }

  enum Priority {
    urgent
    normal
    low
  }

  type Query {
    getAllLists: [Todo!]!
    getListById(id: Int!): Todo!
  }

  type Mutation {
    createTodo(title: String!, description: String!, userId: Int!): Todo!
    updateTodo(id: Int!, title: String!, description: String!): Todo!
    completeTodo(id: Int!): Todo!
    deleteTodo(id: Int!): Todo!
    updatePriority(id: Int!, priority: Priority): Todo!
  }
`;
export const todoResolvers = {
  Query: {
    getAllLists: async (
      _obj: any,
      _args: any,
      context: ContextType,
      _info: any
    ) => {
      const todo_lists = await context.prisma.todo.findMany({
        orderBy: [{ priority: "asc" }],
      });
      return todo_lists;
    },

    getListById: async (
      _obj: any,
      _args: any,
      context: ContextType,
      _info: any
    ) => {
      const todo = await context.prisma.todo.findUniqueOrThrow({
        where: {
          id: _args.id,
        },
      });
      return todo;
    },
  },

  Mutation: {
    createTodo: async (_obj: any, _args: any, context: ContextType) => {
      if (!context.userId) throw new Error("unAuthorized");
      const todo = await context.prisma.todo.create({
        data: {
          title: _args.title,
          description: _args.description,
          userId: _args.userId,
        },
      });
      return todo;
    },

    updateTodo: async (
      _obj: any,
      _args: any,
      context: ContextType,
      _info: any
    ) => {
      if (!context.userId) throw new Error("unAuthorized");
      const todo = await context.prisma.todo.update({
        where: {
          id: _args.id,
        },
        data: {
          title: _args.title,
          description: _args.description,
        },
      });
      return todo;
    },

    completeTodo: async (
      _obj: any,
      _args: any,
      context: ContextType,
      _info: any
    ) => {
      if (!context.userId) throw new Error("unAuthorized");
      const todo = await context.prisma.todo.findUniqueOrThrow({
        where: {
          id: _args.id,
        },
      });
      const done = await context.prisma.done.create({
        data: {
          title: todo.title,
          description: todo.description,
          userId: todo.userId,
        },
      });
      const del_todo = await context.prisma.todo.delete({
        where: {
          id: _args.id,
        },
      });
      return del_todo;
    },

    deleteTodo: async (
      _obj: any,
      _args: any,
      context: ContextType,
      _info: any
    ) => {
      if (!context.userId) throw new Error("unAuthorized");
      const todo = await context.prisma.todo.delete({
        where: {
          id: _args.id,
        },
      });
      return todo;
    },

    updatePriority: async (
      _obj: any,
      _args: any,
      context: ContextType,
      _info: any
    ) => {
      if (!context.userId) throw new Error("unAuthorized");
      const todo = await context.prisma.todo.update({
        where: {
          id: _args.id,
        },
        data: {
          priority: _args.priority,
        },
      });
      return todo;
    },
  },
};
