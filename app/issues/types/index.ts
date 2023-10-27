import { Issue, Status } from '@prisma/client';

export interface IssueSearchParams {
	status?: Status;
	sortBy?: keyof Issue;
	page?: string;
	pageSize?: string;
}

export interface Column {
	label: string;
	value: keyof Issue;
	className?: string;
}
