const resolvers = {
  Query: {
    allUsers: (_parent: any, _args: any, context: any) => {
      return context.prisma.user.findMany()
    },
  },
}

export default resolvers
