import { getIssueData } from '@/app/api/issues/route';

import { Box, Grid } from '@radix-ui/themes';
import EditIssueButton from './_components/EditIssueButton';
import IssueDetails from './_components/IssueDetails';

interface IssueDetailPageProps {
	params: {
		id: string;
	};
}

const IssueDetailPage = async ({ params: { id } }: IssueDetailPageProps) => {
	const issue = await getIssueData(id);

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
