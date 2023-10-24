import { Issue, Status } from '@prisma/client';

export interface SearchParams {
	status?: Status;
	orderBy?: keyof Issue;
}

export interface Column {
	label: string;
	value: keyof Issue;
	className?: string;
}
