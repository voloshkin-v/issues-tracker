import { getServerSession } from 'next-auth';
import { getIssue } from '@/lib/issueService';
import authOptions from '@/app/auth/authOptions';

import { Box, Flex, Grid } from '@radix-ui/themes';
import EditIssueButton from './_components/EditIssueButton';
import IssueDetails from './_components/IssueDetails';
import DeleteIssueButton from './_components/DeleteIssueButton';
import AssigneeSelect from './_components/AssigneeSelect';

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
					<AssigneeSelect issue={issue} />

					<Flex gap="4" direction="column" className="w-fit">
						<EditIssueButton issueId={id} />
						<DeleteIssueButton issueId={id} />
					</Flex>
				</Box>
			)}
		</Grid>
	);
};

export default IssueDetailPage;
