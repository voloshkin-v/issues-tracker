import { getIssue } from '@/lib/issueService';

import { Box, Flex, Grid } from '@radix-ui/themes';
import EditIssueButton from './_components/EditIssueButton';
import IssueDetails from './_components/IssueDetails';
import DeleteIssueButton from './_components/DeleteIssueButton';

interface IssueDetailPageProps {
	params: {
		id: string;
	};
}

const IssueDetailPage = async ({ params: { id } }: IssueDetailPageProps) => {
	const issue = await getIssue(id);

	return (
		<Grid columns={{ initial: '1', md: '2' }} gap="5">
			<Box>
				<IssueDetails issue={issue} />
			</Box>

			<Box>
				<Flex gap="4" direction="column" className="w-fit">
					<EditIssueButton issueId={id} />
					<DeleteIssueButton issueId={id} />
				</Flex>
			</Box>
		</Grid>
	);
};

export default IssueDetailPage;
