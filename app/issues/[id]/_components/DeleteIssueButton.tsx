'use client';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { Spinner } from '@/components';

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
	const navigation = useRouter();
	const [error, setError] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		try {
			setIsDeleting(true);

			await axios.delete(`/api/issues/${issueId}`);
			navigation.push('/issues');
			navigation.refresh();
		} catch (e) {
			setError(true);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button disabled={isDeleting} color="red">
						Delete issue
						{isDeleting && <Spinner />}
					</Button>
				</AlertDialog.Trigger>

				<AlertDialog.Content>
					<AlertDialog.Title>Confirm deletion.</AlertDialog.Title>

					<AlertDialog.Description size="2">
						Are you sure you want to delete this issue? This action
						cannot be undone.
					</AlertDialog.Description>

					<Flex gap="4" mt="5" justify="end">
						<AlertDialog.Cancel>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</AlertDialog.Cancel>

						<AlertDialog.Action>
							<Button
								variant="solid"
								color="red"
								onClick={handleDelete}>
								Delete
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>
						This issue could not be deleted.
					</AlertDialog.Description>

					<Button
						color="gray"
						mt="3"
						variant="soft"
						onClick={() => setError(false)}>
						Ok
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteIssueButton;
