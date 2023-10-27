'use client';

import { Status } from '@prisma/client';
import { DEFAULT_SELECT_VALUE } from '@/constants';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';

import SelectUI from '@/components/SelectUI';

interface IStatus {
	label: string;
	value: Status | typeof DEFAULT_SELECT_VALUE;
}

const statuses: IStatus[] = [
	{ label: 'All', value: DEFAULT_SELECT_VALUE },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'In Progress', value: 'IN_PROGRESS' },
	{ label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
	const { handleChange, searchValue } = useUpdateSearchParams('status');

	return (
		<SelectUI
			items={statuses}
			onValueChange={handleChange}
			placeholder="Filter by status..."
			value={searchValue}
		/>
	);
};

export default IssueStatusFilter;
