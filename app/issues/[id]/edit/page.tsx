import { getIssue } from '@/services/issues';
import { notFound } from 'next/navigation';

import { IssueForm } from '../../_components';

interface EditIssuePageProps {
	params: {
		id: string;
	};
}

const EditIssuePage = async ({ params: { id } }: EditIssuePageProps) => {
	const issue = await getIssue(id);

	if (!issue) {
		notFound();
	}

	return <IssueForm issue={issue} />;
};

export default EditIssuePage;
