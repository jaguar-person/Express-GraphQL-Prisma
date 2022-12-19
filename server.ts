import express from "express";
import { graphqlHTTP } from "express-graphql";
import { context } from "./graphql/context";
import { schema } from "./graphql/index";
import { Request } from "express";

const app = express();

app.use("/graphql", (req: Request, res) => {
  graphqlHTTP({
    schema,
    context: context(req),
    graphiql: true,
  })(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}!`);
});
