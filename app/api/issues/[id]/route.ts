import { NextResponse } from 'next/server';
import { patchIssueSchema } from '@/lib/validationSchemas';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export const PATCH = async (
	request: Request,
	{ params }: { params: { id: string } },
) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json({}, { status: 401 });
	}

	const id = +params.id || -1;

	const body = await request.json();
	const validation = patchIssueSchema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(validation.error.errors, { status: 400 });
	}

	const { assignedToUserId, description, title } = validation.data;

	if (assignedToUserId) {
		const user = await prisma.user.findUnique({
			where: { id: assignedToUserId },
		});

		if (!user) {
			return NextResponse.json(
				{ error: 'Invalid user.' },
				{ status: 400 },
			);
		}
	}

	const issue = await prisma.issue.findUnique({
		where: {
			id,
		},
	});

	if (!issue) {
		return NextResponse.json({ error: 'Invalid issue.' }, { status: 404 });
	}

	const updateIssue = await prisma.issue.update({
		where: {
			id: issue.id,
		},
		data: {
			title,
			description,
			assignedToUserId,
		},
	});

	return NextResponse.json(updateIssue);
};

export const DELETE = async (
	request: Request,
	{ params }: { params: { id: string } },
) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json({}, { status: 401 });
	}

	const id = +params.id || -1;

	const issue = await prisma.issue.findUnique({
		where: {
			id,
		},
	});

	if (!issue) {
		return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
	}

	await prisma.issue.delete({
		where: {
			id: issue.id,
		},
	});

	return NextResponse.json({});
};
