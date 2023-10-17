'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

import { Box } from '@radix-ui/themes';

const links = [
	{ label: 'Dashboard', href: '/' },
	{ label: 'Issues', href: '/issues' },
];

const NavBar = () => {
	const currentPath = usePathname();
	const { data: session, status } = useSession();

	console.log(session);

	return (
		<nav className="flex items-center space-x-6 border-b p-5">
			<Link href="/">
				<AiFillBug />
			</Link>

			<ul className="flex space-x-6">
				{links.map(({ href, label }) => (
					<li key={href}>
						<Link
							className={`transition-colors hover:text-zinc-800 ${
								currentPath === href
									? 'text-zinc-900'
									: 'text-zinc-500'
							}`}
							href={href}>
							{label}
						</Link>
					</li>
				))}

				<Box>
					<div>
						{status === 'authenticated' ? (
							<button onClick={() => signOut()}>Logout</button>
						) : (
							<button onClick={() => signIn()}>Login</button>
						)}
					</div>
				</Box>
			</ul>
		</nav>
	);
};

export default NavBar;
