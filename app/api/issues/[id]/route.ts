import { NextResponse } from 'next/server';
import { issueSchema } from '@/lib/validationSchemas';
import prisma from '@/prisma/client';

export const PATCH = async (
	request: Request,
	{ params }: { params: { id: string } },
) => {
	const body = await request.json();
	const validation = issueSchema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(validation.error.errors, { status: 400 });
	}

	const issue = await prisma.issue.findUnique({
		where: {
			id: Number(params.id),
		},
	});

	if (!issue) {
		return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
	}

	const updatedIssue = await prisma.issue.update({
		where: {
			id: issue.id,
		},
		data: {
			title: validation.data.title,
			description: validation.data.description,
		},
	});

	return NextResponse.json(updatedIssue);
};
