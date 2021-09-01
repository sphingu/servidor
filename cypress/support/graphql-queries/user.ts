const fields = `
  id
  name
  email
`
export const getAll = `
  query {
    users {
     ${fields}
    }
  }
`
export const getById = (id: number): string => `
  query {
    user(id: ${id}) {
      ${fields}
    }
  }
`
export const create = (name: string, email?: string): string => `
  mutation {
    createUser(name:"${name}"${email && `, email:"${email}"`}) {
      ${fields}
    }
  }
`

export const update = (id: number, name?: string, email?: string): string => `
  mutation {
    updateUser(id: ${id}${name && `, name:"${name}"`}${
  email && `, email:"${email}"`
}) {
    ${fields}
    }
  }
`

export const remove = (id: number): string => `
  mutation {
    deleteUser(id: ${id}) {
      ${fields}
    }
  }
`
