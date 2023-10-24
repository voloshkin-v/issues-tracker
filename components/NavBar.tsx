'use client';

import { Container, Flex } from '@radix-ui/themes';
import { AuthStatus, NavLinks, Logo } from '@/components';

const NavBar = () => {
	return (
		<nav className="border-b p-5">
			<Container>
				<Flex justify="between" width="100%">
					<Flex align="center" gap="5">
						<Logo />
						<NavLinks />
					</Flex>

					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;
