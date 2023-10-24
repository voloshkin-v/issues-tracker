import { Column } from '@/types';
import Link from 'next/link';

import { Table } from '@radix-ui/themes';

interface TableUIProps {
	columns: Column[];
	data: any;
}

const TableUI = ({ columns, data }: TableUIProps) => {
	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					{columns.map(({ label, value, className }) => (
						<Table.ColumnHeaderCell
							key={value}
							className={className}>
							<Link
								className="flex w-fit items-center gap-1"
								href={{
									pathname: '/issues',
									query: { ...searchParams, orderBy: value },
								}}>
								{label}

								{value === orderBy && <ArrowUpIcon />}
							</Link>
						</Table.ColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{/* {issues.map(({ id, status, title, createdAt }) => (
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
				))} */}
			</Table.Body>
		</Table.Root>
	);
};

export default TableUI;
