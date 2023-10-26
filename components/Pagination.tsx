'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Button, Flex, Text } from '@radix-ui/themes';

interface PaginationProps {
	itemsCount: number;
	pageSize: number;
	currentPage: number;
}

const Pagination = ({ currentPage, itemsCount, pageSize }: PaginationProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const pageCount = Math.ceil(itemsCount / pageSize);

	if (pageCount <= 1 || currentPage > pageCount) return null;

	const handleChangePage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', page.toString());
		const query = params.toString();
		router.push(`${pathname}?${query}`);
	};

	return (
		<Flex align="center" gap="2">
			<Text size="2">
				Page {currentPage} of {pageCount}
			</Text>

			<Button
				color="gray"
				variant="soft"
				disabled={currentPage === 1}
				onClick={() => handleChangePage(currentPage - 1)}>
				<ChevronLeftIcon />
			</Button>

			<Button
				color="gray"
				variant="soft"
				disabled={currentPage === pageCount}
				onClick={() => handleChangePage(currentPage + 1)}>
				<ChevronRightIcon />
			</Button>
		</Flex>
	);
};

export default Pagination;
