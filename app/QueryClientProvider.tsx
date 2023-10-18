'use client';

import {
	QueryClient,
	QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';

const QueryClientProvider = ({
	children,
}: {
	children: React.ReactElement;
}) => {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<ReactQueryClientProvider client={queryClient}>
			{children}
		</ReactQueryClientProvider>
	);
};

export default QueryClientProvider;
