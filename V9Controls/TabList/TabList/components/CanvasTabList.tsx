import * as React from 'react';
import { TabList, Tab, FluentProvider, SelectTabEvent, SelectTabData } from '@fluentui/react-components';
import { CustomTab, TablistProps } from './Component.types';
import {
    Theme,
    webLightTheme
} from '@fluentui/react-components';

export const CanvasTabList = React.memo((props: TablistProps) => {
    const { items, onSelected, isVertical, size, ariaLabel } = props;

    const onTabSelect = React.useCallback(
        (event: SelectTabEvent, data: SelectTabData) => {
            const item = data.value;
            if (item) {
                const selectedItem = items.find((i) => i.key === item);
                if (selectedItem) {
                    onSelected(selectedItem);
                }
            }
            return true;
        },
        [onSelected, items],
    );

    const tabItems = React.useMemo(() => {
        return items
            .filter((i) => i.visible !== false)
            .map((i: CustomTab, index: number) => {
                return (
                    <Tab key={i.key + index.toString()} value={i.key} id={i.key}>
                        {i.name}
                    </Tab>
                );
            });
    }, [items]);

    return (
        <FluentProvider theme={webLightTheme}>
            <TabList size={size} aria-label={ariaLabel} onTabSelect={onTabSelect} vertical={isVertical}>
                {tabItems}
            </TabList>
        </FluentProvider>
    );
});
CanvasTabList.displayName = 'CanvasTabList';
