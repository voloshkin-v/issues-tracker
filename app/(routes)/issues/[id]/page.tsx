import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

import { Box, Grid } from '@radix-ui/themes';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

interface IssueDetailPageProps {
	params: {
		id: string;
	};
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
	const id = +params.id;

	if (isNaN(id)) {
		notFound();
	}

	const issue = await prisma.issue.findUnique({
		where: {
			id: Number(id),
		},
	});

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: '1', md: '2' }} gap="5">
			<Box>
				<IssueDetails issue={issue} />
			</Box>

			<Box>
				<EditIssueButton issueId={id} />
			</Box>
		</Grid>
	);
};

export default IssueDetailPage;
