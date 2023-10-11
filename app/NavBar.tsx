import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

const links = [
	{ label: 'Dashboard', href: '/' },
	{ label: 'Issues', href: '/issues' },
];

const NavBar = () => {
	return (
		<nav className="mb-5 flex items-center space-x-6 border-b p-5">
			<Link href="/">
				<AiFillBug />
			</Link>

			<ul className="flex space-x-6">
				{links.map(({ href, label }) => (
					<li key={href}>
						<Link
							className="text-zinc-500 transition-colors hover:text-zinc-800"
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
