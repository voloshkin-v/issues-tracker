import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { IssueSearchParams } from '@/app/issues/types';
import { columnNames } from '@/app/issues/_components/IssueTable';
import { Status } from '@prisma/client';
import {
	PAGE_SIZE,
	sizesOption,
} from '@/app/issues/_components/IssuePageSize/settings';

export const getIssue = async (issueId: string) => {
	const issue = await prisma.issue.findUnique({
		where: {
			id: +issueId || -1,
		},
	});

	return issue;
};

export const getIssues = async (searchParams: IssueSearchParams) => {
	const defaultPageSize = Number(PAGE_SIZE);
	const size = Number(searchParams.pageSize) || defaultPageSize;
	const pageSize = sizesOption.includes(size) ? size : defaultPageSize;

	const sortBy =
		searchParams.sortBy && columnNames.includes(searchParams.sortBy)
			? { [searchParams.sortBy]: 'asc' }
			: undefined;

	const status =
		searchParams.status &&
		Object.values(Status).includes(searchParams.status)
			? searchParams.status
			: undefined;

	const where = { status };

	const numPage = Number(searchParams.page);
	const currentPage = numPage && numPage > 0 ? numPage : 1;

	const issues = await prisma.issue.findMany({
		where,
		orderBy: sortBy,
		skip: (currentPage - 1) * pageSize,
		take: pageSize,
	});

	const issuesCount = await prisma.issue.count({
		where,
	});

	return { issues, currentPage, issuesCount, pageSize };
};
