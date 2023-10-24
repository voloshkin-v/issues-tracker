import prisma from '@/prisma/client';
import { Column, SearchParams } from '@/types';
import { Issue } from '@prisma/client';
import { notFound } from 'next/navigation';

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

export const getIssues = async (
	searchParams: SearchParams,
	columns: Column[],
) => {
	const { orderBy, status } = searchParams;

	const validOrderBy =
		orderBy && columns.map((column) => column.value).includes(orderBy)
			? { [orderBy]: 'asc' }
			: undefined;

	const issues = await prisma.issue.findMany({
		orderBy: validOrderBy,
	});

	return { issues, orderBy, status };
};
