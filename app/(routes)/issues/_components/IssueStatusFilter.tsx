'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

const statuses: { label: string; value?: Status }[] = [
	{ label: 'All' },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'In Progress', value: 'IN_PROGRESS' },
	{ label: 'Closed', value: 'CLOSED' },
];

const defaultSelectValue = '-';

const IssueStatusFilter = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const status = searchParams.get('status');
	const defaultValue = statuses.find((item) => item.value === status)?.value;

	const handleFilterChange = (status: string) => {
		const query = status !== defaultSelectValue ? `?status=${status}` : '';
		router.push(`${pathname}${query}`);
	};

	return (
		<Select.Root
			onValueChange={handleFilterChange}
			defaultValue={defaultValue}>
			<Select.Trigger placeholder="Filter by status..." />

			<Select.Content>
				{statuses.map(({ label, value }, i) => (
					<Select.Item key={i} value={value ?? defaultSelectValue}>
						{label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default IssueStatusFilter;
