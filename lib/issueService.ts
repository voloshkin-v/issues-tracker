import prisma from '@/prisma/client';
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
