import IssueActions from './_components/IssueActions';
import IssueTable from './_components/IssueTable';

export const dynamic = 'force-dynamic';

const IssuesPage = async () => {
	return (
		<>
			<IssueActions />
			<IssueTable />
		</>
	);
};

export default IssuesPage;
