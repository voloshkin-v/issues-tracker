'use client';

import { SelectItem } from '@/types';

import { Select } from '@radix-ui/themes';

interface SelectUIProps {
	placeholder?: string;
	items: SelectItem[];
	value?: string;
	onValueChange: (value: string) => void;
}

const SelectUI = ({
	placeholder,
	items,
	value,
	onValueChange,
}: SelectUIProps) => {
	return (
		<Select.Root onValueChange={onValueChange} value={value}>
			<Select.Trigger placeholder={placeholder} />

			<Select.Content>
				{items.map(({ label, value }) => (
					<Select.Item value={value} key={value}>
						{label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default SelectUI;
