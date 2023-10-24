'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Issue, User } from '@prisma/client';
import toast, { Toaster } from 'react-hot-toast';

import { Flex, Select } from '@radix-ui/themes';
import { Spinner } from '@/components';

interface AssigneeSelectProps {
	issue: Issue;
}

const AssigneeSelect = ({ issue }: AssigneeSelectProps) => {
	const { data: users, isError, isLoading } = useUsers();

	const handleChange = async (userId: string) => {
		try {
			await axios.patch(`/api/issues/${issue.id}`, {
				assignedToUserId: userId === '-' ? null : userId,
			});
		} catch (e) {
			toast.error('Changes could not be saved.');
		}
	};

	if (isLoading) {
		return (
			<Flex height="6" align="center">
				<Spinner />
			</Flex>
		);
	}

	if (isError) {
		return null;
	}

	return (
		<>
			<Select.Root
				onValueChange={handleChange}
				defaultValue={issue.assignedToUserId || '-'}>
				<Select.Trigger />

				<Select.Content>
					<Select.Group>
						<Select.Item value="-">Unassigned</Select.Item>

						{users?.map((user) => (
							<Select.Item key={user.id} value={user.id}>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>

			<Toaster />
		</>
	);
};

const useUsers = () => {
	return useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () =>
			axios.get('/api/users').then((response) => response.data),
		staleTime: 60 * 1000,
		retry: 3,
	});
};

export default AssigneeSelect;
