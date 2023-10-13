import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

import { Pencil2Icon } from '@radix-ui/react-icons';

import { IssueStatusBadge } from '@/app/components';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface IssueDetailPageProps {
	params: {
		id: string;
	};
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
	const id = +params.id;

	if (isNaN(id)) {
		notFound();
	}

	const issue = await prisma.issue.findUnique({
		where: {
			id: Number(id),
		},
	});

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: '1', md: '2' }} gap="5">
			<Box>
				<Heading as="h2">{issue.title}</Heading>

				<Flex gap="3" my="2">
					<IssueStatusBadge status={issue.status} />
					<Text as="p">{issue.createdAt.toDateString()}</Text>
				</Flex>

				<Card mt="4">
					<Text as="p">{issue.description}</Text>
				</Card>
			</Box>

			<Box>
				<Button asChild>
					<Link href={`/issues/${id}/edit`}>
						<Pencil2Icon />
						Edit issue
					</Link>
				</Button>
			</Box>
		</Grid>
	);
};

export default IssueDetailPage;
