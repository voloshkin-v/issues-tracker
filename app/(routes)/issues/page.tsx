import { Status } from '@prisma/client';

import IssueActions from './_components/IssueActions';
import IssueTable from './_components/IssueTable';

export const dynamic = 'force-dynamic';

const IssuesPage = async ({
	searchParams: { status },
}: {
	searchParams: { status?: Status };
}) => {
	return (
		<>
			<IssueActions />
			<IssueTable status={status} />
		</>
	);
};

export default IssuesPage;
