import { Metadata } from 'next';
import { IssueForm } from '../_components';

const NewIssuePage = async () => {
	return <IssueForm />;
};

export const metadata: Metadata = {
	title: 'Issue Tracker - Add A New Issue',
	description: 'New Issue',
};

export default NewIssuePage;
