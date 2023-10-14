import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import { issueSchema } from '@/lib/validationSchemas';

export const POST = async (request: NextRequest) => {
	const body: unknown = await request.json();
	const validation = issueSchema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(validation.error.errors, { status: 400 });
	}

	const newIssue = await prisma.issue.create({
		data: {
			title: validation.data.title,
			description: validation.data.description,
		},
	});

	return NextResponse.json(newIssue, { status: 201 });
};

export const getIssueData = async (issueId: string) => {
	const id = Number(issueId);

	if (isNaN(id)) {
		notFound();
	}

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
