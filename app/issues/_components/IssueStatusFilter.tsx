'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Status } from '@prisma/client';
import { DEFAULT_SELECT_VALUE } from '@/constants';

import { Select } from '@radix-ui/themes';

interface IStatus {
	label: string;
	value?: Status;
}

const statuses: IStatus[] = [
	{ label: 'All' },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'In Progress', value: 'IN_PROGRESS' },
	{ label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const status = searchParams.get('status');
	const defaultValue = statuses.find((item) => item.value === status)?.value;

	const handleFilterChange = (status: string) => {
		const query =
			status !== DEFAULT_SELECT_VALUE ? `?status=${status}` : '';
		router.push(`${pathname}${query}`);
	};

	return (
		<Select.Root
			onValueChange={handleFilterChange}
			defaultValue={defaultValue}>
			<Select.Trigger placeholder="Filter by status..." />

			<Select.Content>
				{statuses.map(({ label, value }, i) => (
					<Select.Item key={i} value={value ?? DEFAULT_SELECT_VALUE}>
						{label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default IssueStatusFilter;
