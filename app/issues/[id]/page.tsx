import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { getIssue } from '@/services/issues';

import { Box, Flex, Grid } from '@radix-ui/themes';
import {
	AssigneeSelect,
	DeleteIssueButton,
	EditIssueButton,
	IssueDetails,
} from './_components';
import prisma from '@/prisma/client';

interface IssueDetailPageProps {
	params: {
		id: string;
	};
}

const IssueDetailPage = async ({ params: { id } }: IssueDetailPageProps) => {
	const issue = await getIssue(id);
	const session = await getServerSession(authOptions);

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
	const issue = await getIssue(params.id);

	return {
		title: issue?.title,
		description: `Description of issue ${issue?.id}`,
	};
}

export default IssueDetailPage;
