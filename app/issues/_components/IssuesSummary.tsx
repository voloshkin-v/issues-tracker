import { Status } from '@prisma/client';

import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface IssuesSummaryProps {
	open: number;
	inProgress: number;
	closed: number;
}

const IssuesSummary = ({ closed, inProgress, open }: IssuesSummaryProps) => {
	const containers: { label: string; value: number; status: Status }[] = [
		{ label: 'Open Issues', value: open, status: 'OPEN' },
		{
			label: 'In Progress Issues',
			value: inProgress,
			status: 'IN_PROGRESS',
		},
		{ label: 'Closed Issues', value: closed, status: 'CLOSED' },
	];

	return (
		<Flex gap="4" direction={{ initial: 'column', sm: 'row' }}>
			{containers.map((container) => (
				<Card key={container.label}>
					<Flex direction="column" gap="1">
						<Link
							className="text-sm"
							href={`/issues?status=${container.status}`}>
							{container.label}
						</Link>

						<Text size="5" className="font-bold">
							{container.value}
						</Text>
					</Flex>
				</Card>
			))}
		</Flex>
	);
};

export default IssuesSummary;
