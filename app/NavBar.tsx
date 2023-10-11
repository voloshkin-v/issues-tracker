'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const links = [
	{ label: 'Dashboard', href: '/' },
	{ label: 'Issues', href: '/issues' },
];

const NavBar = () => {
	const currentPath = usePathname();

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
			</ul>
		</nav>
	);
};

export default NavBar;
