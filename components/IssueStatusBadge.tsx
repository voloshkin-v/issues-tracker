import { Status } from '@prisma/client';

import { Badge } from '@radix-ui/themes';

interface IssueStatusBadgeProps {
	status: Status;
}

type StatusMap = Record<
	Status,
	{ label: string; color: 'red' | 'violet' | 'green' }
>;

const statusMap: StatusMap = {
	OPEN: { label: 'Open', color: 'red' },
	IN_PROGRESS: { label: 'In progress', color: 'violet' },
	CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: IssueStatusBadgeProps) => {
	return (
		<Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
	);
};

export default IssueStatusBadge;
