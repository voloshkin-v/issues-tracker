import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';

import { Button } from '@radix-ui/themes';

const EditIssueButton = ({ issueId }: { issueId: string }) => {
	return (
		<Button asChild>
			<Link href={`/issues/${issueId}/edit`}>
				<Pencil2Icon />
				Edit issue
			</Link>
		</Button>
	);
};

export default EditIssueButton;
