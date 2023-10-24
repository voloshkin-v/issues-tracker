import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Status } from '@prisma/client';

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

// export const getIssues = async (searchParams: SearchParams) => {
// 	const { orderBy, status } = searchParams;

// 	const validStatus = Object.values(Status).includes(status as Status)
// 		? status
// 		: undefined;

// 	const validOrderBy =
// 		orderBy && columns.map((column) => column.value).includes(orderBy)
// 			? { [orderBy]: 'asc' }
// 			: undefined;

// 	const issues = await prisma.issue.findMany({
// 		where: {
// 			status: validStatus,
// 		},
// 		orderBy: validOrderBy,
// 	});

// 	return { issues, orderBy, status };
// };
