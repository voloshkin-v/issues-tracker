import { NextRequest, NextResponse } from 'next/server';
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
