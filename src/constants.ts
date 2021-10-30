export const PORT = process.env.port || 5001
export const BASE_URL = `http://localhost:${PORT}`
export const GRAPHQL_URL = `${BASE_URL}/graphql`
export const SESSION_SECRET = process.env.SESSION_SECRET as string

export const GOOGLE = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  CALLBACK_URL: '/auth/google/callback',
}
