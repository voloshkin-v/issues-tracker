import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { IssueSearchParams } from '@/app/issues/types';
import { columnNames } from '@/app/issues/_components/IssueTable';
import { Status } from '@prisma/client';
import { PAGINATION_PAGE_SIZE } from '@/constants';

export const getIssue = async (issueId: string) => {
	const id = +issueId || -1;

	const issue = await prisma.issue.findUnique({
		where: {
			id,
		},
	});

	if (!issue) {
		notFound();
	}

	return issue;
};

export const getIssues = async (searchParams: IssueSearchParams) => {
	const { sortBy, status, page } = searchParams;

	const validSortBy =
		sortBy && columnNames.includes(sortBy)
			? { [sortBy]: 'asc' }
			: undefined;

	const validStatus =
		status && Object.values(Status).includes(status) ? status : undefined;

	const where = { status: validStatus };

	const numPage = Number(page);
	const currentPage = numPage && numPage > 0 ? numPage : 1;

	const issues = await prisma.issue.findMany({
		where,
		orderBy: validSortBy,
		skip: (currentPage - 1) * PAGINATION_PAGE_SIZE,
		take: PAGINATION_PAGE_SIZE,
	});

	const issuesCount = await prisma.issue.count({
		where,
	});

	return { issues, currentPage, issuesCount };
};
