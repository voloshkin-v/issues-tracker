import { useSession, signIn, signOut } from 'next-auth/react';

import { Avatar, Box, Button, DropdownMenu, Text } from '@radix-ui/themes';
import { Skeleton } from '@/components';

const AuthStatus = () => {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return (
			<Skeleton
				width="2rem"
				height="2rem"
				circle
				containerClassName="flex"
			/>
		);
	}

	if (!session) {
		return <Button onClick={() => signIn()}>Sign in</Button>;
	}

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar
						size="2"
						radius="full"
						src={session.user?.image!}
						fallback="?"
						className="cursor-pointer"
					/>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>
						<Text>{session.user?.email}</Text>
					</DropdownMenu.Label>

					<DropdownMenu.Item asChild>
						<Button onClick={() => signOut()}>Sign out</Button>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};

export default AuthStatus;
