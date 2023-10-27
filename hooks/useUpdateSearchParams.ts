import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useUpdateSearchParams = (
	searchParam: string,
	defaultValue: string = '',
) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const searchValue = searchParams.get(searchParam) ?? defaultValue;

	const handleChange = (value: string) => {
		const params = new URLSearchParams(searchParams);
		params.set(searchParam, value);

		if (searchParam !== 'page') {
			params.delete('page');
		}

		router.push(`${pathname}?${params.toString()}`);
	};

	return { searchValue, handleChange };
};
