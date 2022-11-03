export interface CustomTab {
    id: string;
    enabled?: boolean;
    name: string;
    iconName?: string;
    iconColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    itemCount?: number;
    visible?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    key: string;
    checked: boolean;
}

export interface TablistProps {
    width?: number;
    height?: number;
    items: CustomTab[];
    onSelected: (item: CustomTab) => void;
    disabled?: boolean;
    ariaLabel?: string;
    selectedValue?: string;
    size: 'small' | 'medium';
    isVertical: boolean;
}
