'use client';

import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

import { Card } from '@radix-ui/themes';

interface IssuesChartProps {
	open: number;
	inProgress: number;
	closed: number;
}

const IssuesChart = (props: IssuesChartProps) => {
	const isExist = Object.values(props).some((count) => count > 0);
	if (!isExist) return null;

	const { closed, inProgress, open } = props;

	const data = [
		{ label: 'Open', value: open },
		{ label: 'In Progress', value: inProgress },
		{ label: 'Closed', value: closed },
	];

	return (
		<Card>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<XAxis dataKey="label" />
					<YAxis />
					<Bar
						dataKey="value"
						barSize={60}
						style={{ fill: 'var(--accent-9)' }}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Card>
	);
};

export default IssuesChart;
