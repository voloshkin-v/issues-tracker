import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';
import React from 'react';

interface IssueStatusBadgeProps {
	status: Status;
}

const statusMap: Record<
	Status,
	{ label: string; color: 'red' | 'violet' | 'green' }
> = {
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
