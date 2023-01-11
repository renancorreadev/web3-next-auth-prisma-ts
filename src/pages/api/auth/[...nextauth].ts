import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaAdapterCustom } from '../../../lib/utils/prisma-adapter'

const prisma = new PrismaAdapterCustom()

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
})
