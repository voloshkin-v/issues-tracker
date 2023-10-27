import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { getIssue } from '@/services/issues';
import { notFound } from 'next/navigation';

import { Box, Flex, Grid } from '@radix-ui/themes';
import {
	AssigneeSelect,
	DeleteIssueButton,
	EditIssueButton,
	IssueDetails,
} from './_components';
import { cache } from 'react';

const getCachedIssue = cache((issueId: string) => getIssue(issueId));

interface IssueDetailPageProps {
	params: {
		id: string;
	};
}

const IssueDetailPage = async ({ params: { id } }: IssueDetailPageProps) => {
	const issue = await getCachedIssue(id);
	const session = await getServerSession(authOptions);

	if (!issue) {
		notFound();
	}

	return (
		<Grid columns={{ initial: '1', md: '2' }} gap="5">
			<Box>
				<IssueDetails issue={issue} />
			</Box>

			{session && (
				<Box className="space-y-4">
					<Flex gap="4">
						<AssigneeSelect issue={issue} />
					</Flex>

					<Flex gap="4" direction="column" className="w-fit">
						<EditIssueButton issueId={id} />
						<DeleteIssueButton issueId={id} />
					</Flex>
				</Box>
			)}
		</Grid>
	);
};

export async function generateMetadata({ params }: IssueDetailPageProps) {
	const issue = await getCachedIssue(params.id);

	return {
		title: issue?.title,
		description: `Description of issue ${issue?.id}`,
	};
}

export default IssueDetailPage;
