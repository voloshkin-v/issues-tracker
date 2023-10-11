import Link from 'next/link';
import { Button } from '@radix-ui/themes';

const IssuesPage = () => {
	return (
		<>
			<h1>Issues</h1>
			<Button asChild>
				<Link href="/issues/new">New issue</Link>
			</Button>
		</>
	);
};

export default IssuesPage;
