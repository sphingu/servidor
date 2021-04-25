import { extendType, nonNull, objectType, stringArg } from "nexus";

export const User = objectType({
  name: "User",

  definition(t) {
    t.int("id");
    t.string("email");
    t.string("name");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    return t.nonNull.list.field("users", {
      type: "User",
      resolve(_, __, ctx) {
        return ctx.db.user.findMany();
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      resolve(_, args, ctx) {
        const user = {
          email: args.email,
          name: args.name,
        };

        return ctx.db.user.create({ data: user });
      },
    });
  },
});
