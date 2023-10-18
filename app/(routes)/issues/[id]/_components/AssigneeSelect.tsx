'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Select } from '@radix-ui/themes';
import { User } from '@prisma/client';
import Skeleton from 'react-loading-skeleton';
import Spinner from '../loading';

const AssigneeSelect = () => {
	const {
		data: users,
		isError,
		isLoading,
	} = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () =>
			axios.get('/api/users').then((response) => response.data),
		staleTime: 60 * 1000,
		retry: 3,
	});

	if (isError) return null;

	return (
		<Select.Root disabled={isLoading}>
			<Select.Trigger placeholder="Asign..." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>

					{users?.map((user) => (
						<Select.Item key={user.id} value={user.id}>
							{user.name}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default AssigneeSelect;
