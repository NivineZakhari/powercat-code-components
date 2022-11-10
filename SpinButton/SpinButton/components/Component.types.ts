/**
 * @license Copyright (c) Microsoft Corporation. All rights reserved.
 */

import { SpinButton, ISpinButtonProps } from '@fluentui/react/lib/SpinButton';

export interface ISpinButtonComponentProps extends ISpinButtonProps {
    themeJSON?: string;
    width?: number;
    height?: number;
    iconName?: string;
    disabled?: boolean;
    onChanged: (newValue: string | undefined) => void;
}