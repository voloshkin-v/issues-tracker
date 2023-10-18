import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import { AuthOptions } from 'next-auth';

const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
};

export default authOptions;
