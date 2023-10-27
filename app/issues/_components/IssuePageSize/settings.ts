import { SelectItem } from '@/types';

export const items: SelectItem[] = [
	{ label: '10', value: '10' },
	{ label: '15', value: '15' },
	{ label: '20', value: '20' },
	{ label: '25', value: '25' },
];

export const sizesOption = items.map((item) => +item.value);

export const PAGE_SIZE = items[0].value;
