import { IssueStatusBadge } from '@/components';
import { Issue } from '@prisma/client';
import { Flex, Heading, Text, Card } from '@radix-ui/themes';

const IssueDetails = ({ issue }: { issue: Issue }) => {
	return (
		<>
			<Heading as="h2">{issue.title}</Heading>

			<Flex gap="3" my="2">
				<IssueStatusBadge status={issue.status} />
				<Text as="p">{issue.createdAt.toDateString()}</Text>
			</Flex>

			<Card mt="4">
				<Text as="p">{issue.description}</Text>
			</Card>
		</>
	);
};

export default IssueDetails;
