import { getIssueData } from '@/app/api/issues/route';

import IssueForm from '../../_components/IssueForm';

interface EditIssuePageProps {
	params: {
		id: string;
	};
}

const EditIssuePage = async ({ params: { id } }: EditIssuePageProps) => {
	const issue = await getIssueData(id);

	return <IssueForm issue={issue} />;
};

export default EditIssuePage;
