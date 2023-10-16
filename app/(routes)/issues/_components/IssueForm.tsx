'use client';

import axios from 'axios';
import { useState, useTransition } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/lib/validationSchemas';
import { z } from 'zod';
import { Issue } from '@prisma/client';

import { Button, Callout, TextArea, TextField } from '@radix-ui/themes';
import { ErrorMessage, Spinner } from '@/components';
import { revalidatePath } from 'next/cache';

type TIssueForm = z.infer<typeof issueSchema>;
interface IssueFormProps {
	issue?: Issue;
}

const IssueForm = ({ issue }: IssueFormProps) => {
	const [isPending, startTransition] = useTransition();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TIssueForm>({
		defaultValues: {
			title: issue?.title,
			description: issue?.description,
		},
		resolver: zodResolver(issueSchema),
	});
	const router = useRouter();
	const [error, setError] = useState('');

	const onSubmit: SubmitHandler<TIssueForm> = async (data) => {
		try {
			if (issue) {
				if (
					data.description === issue.description &&
					data.title === issue.title
				) {
					return;
				}

				await axios.patch(`/api/issues/${issue.id}`, data);
			} else {
				await axios.post('/api/issues', data);
			}

			router.push('/issues');
			startTransition(() => {
				router.refresh();
			});
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

					<ErrorMessage>{errors.title?.message}</ErrorMessage>
				</div>

				<div>
					<TextArea
						placeholder="Description"
						{...register('description')}
					/>

					<ErrorMessage>{errors.description?.message}</ErrorMessage>
				</div>

				<Button disabled={isSubmitting}>
					{issue ? 'Update Issue' : 'Submit New Issue'}
					{isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;
