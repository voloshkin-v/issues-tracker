import prisma from '@/prisma/client';
import { Metadata } from 'next';

import { Flex, Grid } from '@radix-ui/themes';
import { IssuesChart, IssuesSummary, LatestIssues } from './issues/_components';

export const dynamic = 'force-dynamic';

export default async function Home() {
	const open = await prisma.issue.count({
		where: { status: 'OPEN' },
	});
	const closed = await prisma.issue.count({
		where: { status: 'CLOSED' },
	});
	const inProgress = await prisma.issue.count({
		where: { status: 'IN_PROGRESS' },
	});

	return (
		<Grid columns={{ initial: '1', md: '2' }} gap="5">
			<Flex direction="column" gap="5">
				<IssuesSummary
					open={open}
					closed={closed}
					inProgress={inProgress}
				/>

				<IssuesChart
					open={open}
					closed={closed}
					inProgress={inProgress}
				/>
			</Flex>

			<LatestIssues />
		</Grid>
	);
}

export const metadata: Metadata = {
	title: 'Issue Tracker - Dashboard',
	description: 'View a summary of project issues.',
};
