import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Issue } from '@prisma/client';
import { IssueSearchParams, Column } from '../types';

import { Table } from '@radix-ui/themes';
import { IssueStatusBadge, Link } from '@/components';

interface IssueTableProps {
	searchParams: IssueSearchParams;
	issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: IssueTableProps) => {
	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					{columns.map(({ label, value, className }) => (
						<Table.ColumnHeaderCell
							key={value}
							className={className}>
							<NextLink
								className="flex w-fit items-center gap-1"
								href={{
									pathname: '/issues',
									query: {
										...searchParams,
										sortBy: value,
									},
								}}>
								{label}

								{value === searchParams.sortBy && (
									<ArrowUpIcon />
								)}
							</NextLink>
						</Table.ColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{issues.map(({ id, status, title, createdAt }) => (
					<Table.Row key={id}>
						<Table.Cell>
							<Link href={`/issues/${id}`}>{title}</Link>

							<div className="mt-2 block md:hidden">
								<IssueStatusBadge status={status} />
							</div>
						</Table.Cell>
						<Table.Cell className="hidden md:table-cell">
							<IssueStatusBadge status={status} />
						</Table.Cell>
						<Table.Cell className="hidden md:table-cell">
							{createdAt.toDateString()}
						</Table.Cell>
					</Table.Row>
				))}

				{!issues.length && (
					<Table.Row>
						<Table.Cell>There are no issues.</Table.Cell>
					</Table.Row>
				)}
			</Table.Body>
		</Table.Root>
	);
};

const columns: Column[] = [
	{ label: 'Issue', value: 'title' },
	{
		label: 'Status',
		value: 'status',
		className: 'hidden md:table-cell',
	},
	{
		label: 'Created',
		value: 'createdAt',
		className: 'hidden md:table-cell',
	},
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
