import { CustomTab } from './Component.types';
import { ItemColumns } from '../ManifestConstants';

export function getTabListItemsFromDataset(dataset: ComponentFramework.PropertyTypes.DataSet): CustomTab[] {
    if (dataset.error || dataset.paging.totalResultCount === undefined) {
        // Dataset is not defined so return dummy items
        return [getDummyAction('1'), getDummyAction('2'), getDummyAction('3')];
    }
    const keyIndex: Record<string, number> = {};
    return dataset.sortedRecordIds.map((id) => {
        const record = dataset.records[id];
        // Prevent duplicate keys by appending the duplicate index
        let key = record.getValue(ItemColumns.Key) as string;
        if (keyIndex[key] !== undefined) {
            keyIndex[key]++;
            key += `_${keyIndex[key]}`;
        } else keyIndex[key] = 1;
        return {
            id: record.getRecordId(),
            key: key,
            name: record.getValue(ItemColumns.DisplayName) as string,
            iconName: record.getValue(ItemColumns.IconName) as string,
            iconColor: record.getValue(ItemColumns.IconColor) as string,
            textColor: record.getValue(ItemColumns.TextColor) as string,
            parentItemKey: record.getValue(ItemColumns.ParentKey) as string,
            iconOnly: record.getValue(ItemColumns.IconOnly) as boolean,
            checked: record.getValue(ItemColumns.Checked) as boolean,
            itemCount: (record.getValue(ItemColumns.ItemCount) as number) ?? undefined,
            data: record,
        } as CustomTab;
    });
}

function getDummyAction(key: string): CustomTab {
    return {
        id: key,
        key: key,
        name: 'Item ' + key,
        iconName: key === '2' ? 'Pivot24Filled' : 'Pivot24Regular',
    } as CustomTab;
}
