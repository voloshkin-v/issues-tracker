import Link from 'next/link';

import { Button } from '@radix-ui/themes';

const IssueActions = () => {
	return (
		<div className="mb-5">
			<Button asChild>
				<Link href="/issues/new">New issue</Link>
			</Button>
		</div>
	);
};

export default IssueActions;
