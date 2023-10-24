import { SearchParams } from '@/types';

import { IssueActions, IssueTable } from './_components';

interface IssuesPageProps {
	searchParams: SearchParams;
}

export const dynamic = 'force-dynamic';

const IssuesPage = async ({ searchParams }: IssuesPageProps) => {
	return (
		<>
			<IssueActions />
			<IssueTable searchParams={searchParams} />
		</>
	);
};

export default IssuesPage;
