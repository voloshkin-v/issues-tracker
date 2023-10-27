'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Button, Flex, Text } from '@radix-ui/themes';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';

interface PaginationProps {
	itemsCount: number;
	pageSize: number;
	currentPage: number;
}

const Pagination = ({ currentPage, itemsCount, pageSize }: PaginationProps) => {
	const { handleChange } = useUpdateSearchParams('page');

	const pageCount = Math.ceil(itemsCount / pageSize);

	if (pageCount <= 1 || currentPage > pageCount) return null;

	return (
		<Flex align="center" gap="2">
			<Text size="2">
				Page {currentPage} of {pageCount}
			</Text>

			<Button
				color="gray"
				variant="soft"
				disabled={currentPage === 1}
				onClick={() => handleChange(String(currentPage - 1))}>
				<ChevronLeftIcon />
			</Button>

			<Button
				color="gray"
				variant="soft"
				disabled={currentPage === pageCount}
				onClick={() => handleChange(String(currentPage + 1))}>
				<ChevronRightIcon />
			</Button>
		</Flex>
	);
};

export default Pagination;
