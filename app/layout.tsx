import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Container, Theme } from '@radix-ui/themes';
import AuthProvider from './auth/Provider';

import { NavBar } from '../components';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

export const metadata: Metadata = {
	title: 'Issue Tracker',
	description: 'Issue Tracker App',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.variable}>
				<AuthProvider>
					<Theme accentColor="violet">
						<NavBar />

						<main className="p-5">
							<Container>{children}</Container>
						</main>
					</Theme>
				</AuthProvider>
			</body>
		</html>
	);
}
