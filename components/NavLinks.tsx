import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
	{ label: 'Dashboard', href: '/' },
	{ label: 'Issues', href: `/issues` },
];

const NavLinks = () => {
	const currentPath = usePathname();

	return (
		<ul className="flex space-x-6">
			{links.map(({ href, label }) => (
				<li key={href}>
					<Link
						className={`nav-link${
							currentPath === href ? ' active' : ''
						}`}
						href={href}>
						{label}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default NavLinks;
