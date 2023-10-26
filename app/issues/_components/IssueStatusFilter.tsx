'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Status } from '@prisma/client';
import { DEFAULT_SELECT_VALUE } from '@/constants';

import { Select } from '@radix-ui/themes';

interface IStatus {
	label: string;
	value: Status | typeof DEFAULT_SELECT_VALUE;
}

const statuses: IStatus[] = [
	{ label: 'All', value: 'unassigned' },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'In Progress', value: 'IN_PROGRESS' },
	{ label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleFilterChange = (status: string) => {
		const params = new URLSearchParams(searchParams);

		status === DEFAULT_SELECT_VALUE
			? params.delete('status')
			: params.set('status', status);

		params.delete('page');

		const query = params.toString();

		router.push(`${pathname}?${query}`);
	};

	return (
		<Select.Root
			onValueChange={handleFilterChange}
			defaultValue={searchParams.get('status') || ''}>
			<Select.Trigger placeholder="Filter by status..." />

			<Select.Content>
				{statuses.map(({ label, value }, i) => (
					<Select.Item key={i} value={value}>
						{label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default IssueStatusFilter;
