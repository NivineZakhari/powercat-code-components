import * as React from 'react';
import { IInputs, IOutputs } from './generated/ManifestTypes';
import { CanvasTabList } from './components/CanvasTabList';
import { TablistProps, CustomTab } from './components/Component.types';
import { getTabListItemsFromDataset } from './components/DatasetMapping';
import { ContextEx } from './ContextExtended';
import { InputProperties, ManifestPropertyNames, RenderSize } from './ManifestConstants';

export class TabList implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    notifyOutputChanged: () => void;
    lastSelected?: CustomTab;
    inputEvent?: string | null;
    context: ComponentFramework.Context<IInputs>;
    items: CustomTab[];
    focusKey = '';
    onSelectCalled = false;

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
        this.context.mode.trackContainerResize(true);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const dataset = context.parameters.items;
        const datasetChanged = context.updatedProperties.indexOf(ManifestPropertyNames.dataset) > -1 || !this.items;

        if (datasetChanged) {
            this.items = getTabListItemsFromDataset(dataset);
            // The onSelected needs to be updated because the items have changed
            this.onSelectCalled = false;
        }

        // If the selected key has changed, update the Selected property
        this.checkSelectedKeyChanged(context);

        // The test harness provides width/height as strings so use parseInt
        const allocatedWidth = parseInt(context.mode.allocatedWidth as unknown as string);
        const allocatedHeight = parseInt(context.mode.allocatedHeight as unknown as string);

        // The tabIndex is required since canvas apps sets a non-zero tabindex
        const tabIndex = (context as unknown as ContextEx).accessibility?.assignedTabIndex ?? undefined;
        const renderSize = context.parameters.RenderSize.raw === RenderSize.Small ? 'small' : 'medium';
        const props = {
            tabIndex: tabIndex,
            width: allocatedWidth,
            height: allocatedHeight,
            items: this.items,
            onSelected: this.onSelect,
            disabled: context.mode.isControlDisabled,
            selectedKey: context.parameters.SelectedKey.raw ?? '',
            size: renderSize,
            isVertical: context.parameters.IsVertical.raw,
        } as TablistProps;
        return React.createElement(CanvasTabList, props);
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {
            SelectedKey: this.lastSelected?.key ?? null,
        } as IOutputs;
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // NA
    }

    private checkSelectedKeyChanged(context: ComponentFramework.Context<IInputs>) {
        // When the bound selected key has changed, and is different from the last selected
        // we raise the OnSelect event to ensure that the Selected property is kept in sync
        const selectedKey = context.parameters.SelectedKey.raw;
        const selectedKeyUpdated = context.updatedProperties.indexOf(InputProperties.SelectedKey) > -1;
        const selectedKeyDifferent = this.lastSelected?.key !== selectedKey;
        const initialOnSelectNeeded = !this.onSelectCalled && selectedKey !== undefined;
        if (initialOnSelectNeeded || (selectedKeyUpdated && selectedKeyDifferent)) {
            const lastSelectedItem = this.items.find((i) => i.key === selectedKey);
            this.onSelect(lastSelectedItem, false);
        }
    }

    onSelect = (item?: CustomTab, raiseOnChange?: boolean): void => {
        if (raiseOnChange === undefined || raiseOnChange === true) {
            this.lastSelected = item;
            this.notifyOutputChanged();
        }
        if (item && item.data) {
            this.onSelectCalled = true;
            this.context.parameters.items.openDatasetItem(item.data.getNamedReference());
        }
    };
}
