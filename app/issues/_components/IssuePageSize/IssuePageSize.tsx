'use client';

import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';
import { PAGE_SIZE, items } from './settings';

import SelectUI from '@/components/SelectUI';

const IssuePageSize = () => {
	const { handleChange, searchValue } = useUpdateSearchParams(
		'pageSize',
		PAGE_SIZE,
	);

	return (
		<SelectUI
			value={searchValue}
			items={items}
			onValueChange={handleChange}
		/>
	);
};

export default IssuePageSize;
