'use client';

import axios from 'axios';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/lib/validationSchemas';
import { z } from 'zod';

import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});
	const router = useRouter();
	const [error, setError] = useState('');

	const onSubmit: SubmitHandler<IssueForm> = async (data) => {
		try {
			const response = await axios.post('/api/issues', data);
			router.push('/issues');
		} catch (error) {
			setError('An unexpected error occurred.');
		}
	};

	return (
		<div className="max-w-2xl space-y-3">
			{error && (
				<Callout.Root color="red">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}

			<form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<TextField.Root>
						<TextField.Input
							placeholder="Title"
							{...register('title')}
						/>
					</TextField.Root>

					{errors.title && (
						<Text size="2" color="red" as="p">
							{errors.title.message}
						</Text>
					)}
				</div>

				<div>
					<TextArea
						placeholder="Description"
						{...register('description')}
					/>

					{errors.description && (
						<Text size="2" color="red" as="p">
							{errors.description.message}
						</Text>
					)}
				</div>

				<Button>Submit New Issue</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
