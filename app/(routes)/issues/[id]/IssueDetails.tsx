import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Flex, Heading, Text, Card } from '@radix-ui/themes';

interface IssueDetailsProps {
	issue: Issue;
}

const IssueDetails = ({ issue }: IssueDetailsProps) => {
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
