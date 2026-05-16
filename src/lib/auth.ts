import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // For admin login, use hardcoded credentials for now
        // In production, this should be replaced with database lookup
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'nirmal@piba.com'
        const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$YourHashedPasswordHere'

        if (credentials.email === ADMIN_EMAIL && credentials.password === 'nirmal') {
          return {
            id: '1',
            email: ADMIN_EMAIL,
            name: 'Admin User',
            role: 'admin',
            membershipType: 'professional',
            isVerified: true,
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
        token.membershipType = user.membershipType
        token.isVerified = user.isVerified
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
        session.user.membershipType = token.membershipType
        session.user.isVerified = token.isVerified
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
}

export default NextAuth(authOptions)
