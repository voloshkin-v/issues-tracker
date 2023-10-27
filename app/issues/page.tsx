import { getIssues } from '@/services/issues';
import { IssueSearchParams } from './types';

import { Pagination } from '@/components';
import { IssueActions, IssueTable } from './_components';
import { Flex } from '@radix-ui/themes';
// import { PAGINATION_PAGE_SIZE } from '@/constants';

interface IssuesPageProps {
	searchParams: IssueSearchParams;
}

export const dynamic = 'force-dynamic';

const IssuesPage = async ({ searchParams }: IssuesPageProps) => {
	const { issues, currentPage, issuesCount, pageSize } =
		await getIssues(searchParams);

	return (
		<Flex direction="column" gap="5">
			<IssueActions />
			<IssueTable searchParams={searchParams} issues={issues} />
			<Pagination
				currentPage={currentPage}
				itemsCount={issuesCount}
				pageSize={pageSize}
			/>
		</Flex>
	);
};

export default IssuesPage;
