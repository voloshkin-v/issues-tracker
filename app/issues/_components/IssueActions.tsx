import Link from 'next/link';

import { Button, Flex } from '@radix-ui/themes';
import { IssueStatusFilter, IssuePageSize } from '.';

const IssueActions = () => {
	return (
		<Flex justify="between" wrap="wrap" gap="4">
			<Button asChild>
				<Link href="/issues/new">New issue</Link>
			</Button>

			<Flex gap="4" align="center">
				<IssuePageSize />
				<IssueStatusFilter />
			</Flex>
		</Flex>
	);
};

export default IssueActions;
