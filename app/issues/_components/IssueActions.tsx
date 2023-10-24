import Link from 'next/link';

import { Button, Flex } from '@radix-ui/themes';
import { IssueStatusFilter } from '.';

const IssueActions = () => {
	return (
		<Flex mb="5" justify="between">
			<Button asChild>
				<Link href="/issues/new">New issue</Link>
			</Button>

			<IssueStatusFilter />
		</Flex>
	);
};

export default IssueActions;
