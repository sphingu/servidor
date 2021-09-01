const fields = `
  id
  name
  amount
  payerId
  payer {
    id
    name
    email
  }
  ownedUsers {
    id
    name
    email
  }
  date
  month
  year
`
export const getAll = `
  query {
    transactions {
     ${fields}
    }
  }
`
export const getById = (id: number): string => `
  query {
    transaction(id: ${id}) {
      ${fields}
    }
  }
`
export const create = (
  name: string,
  amount: number,
  payerId: number,
  ownedUserIds: number[],
  date: Date,
): string => `
  mutation {
    createTransaction(
      name: "${name}"
      amount: ${amount}
      payerId: ${payerId}
      ownedUserIds: [${ownedUserIds.join(',')}]
      date: "${date.toJSON()}"
    ) {
      ${fields}
    }
  }
`

export const update = (
  id: number,
  name?: string,
  amount?: number,
  payerId?: number,
  ownedUserIds?: number[],
  date?: Date,
): string => `
  mutation {
    updateTransaction(
      id: ${id}
      ${name && `name: "${name}"`}
      ${amount && `amount: ${name}`}
      ${payerId && `payerId: ${name}`}
      ${
        ownedUserIds &&
        ownedUserIds.length &&
        `ownedUserIds: [${ownedUserIds.join(',')}]`
      }
      ${date && `date: "${date.toJSON()}"`}
    ) {
      ${fields}
    }
  }
`

export const remove = (id: number): string => `
  mutation{
    deleteTransaction(id: ${id}) {
      id
    }
  }
`
