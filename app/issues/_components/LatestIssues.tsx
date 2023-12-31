import prisma from '@/prisma/client';
import Link from 'next/link';

import { Avatar, Card, Flex, Heading, Table, Text } from '@radix-ui/themes';
import { IssueStatusBadge } from '../../../components';

const LatestIssues = async () => {
	const issues = await prisma.issue.findMany({
		orderBy: { createdAt: 'desc' },
		take: 5,
		include: {
			assignedToUser: true,
		},
	});

	return (
		<Card>
			<Heading size="4" mb="2">
				Latest Issues
			</Heading>

			{issues.length > 0 ? (
				<Table.Root>
					<Table.Body>
						{issues.map((issue) => (
							<Table.Row key={issue.id}>
								<Table.Cell>
									<Flex justify="between" align="center">
										<Flex
											direction="column"
											align="start"
											gap="2">
											<Link href={`/issues/${issue.id}`}>
												{issue.title}
											</Link>
											<IssueStatusBadge
												status={issue.status}
											/>
										</Flex>

										{issue.assignedToUser && (
											<Avatar
												size="2"
												radius="full"
												src={
													issue.assignedToUser
														.image ?? undefined
												}
												fallback="?"
											/>
										)}
									</Flex>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			) : (
				<Text>There are no issues.</Text>
			)}
		</Card>
	);
};

export default LatestIssues;
