'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Issue, User } from '@prisma/client';

import { Box, Flex, Select } from '@radix-ui/themes';
import Spinner from '../loading';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
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

	const handleChange = async (userId: string) => {
		try {
			axios.patch(`/api/issues/${issue.id}`, {
				assignedToUserId: userId === '-' ? null : userId,
			});
		} catch (e) {
			console.log(e);
		}
	};

	if (isLoading) {
		return (
			<Flex height="6" align="center">
				<Spinner />
			</Flex>
		);
	}

	if (isError) return null;

	return (
		<Select.Root
			onValueChange={handleChange}
			defaultValue={issue.assignedToUserId || '-'}>
			<Select.Trigger />

			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>

					<Select.Item value="-">Unassigned</Select.Item>

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
