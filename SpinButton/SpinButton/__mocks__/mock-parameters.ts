/* istanbul ignore file */

import { IInputs } from '../generated/ManifestTypes';
import { MockStringProperty, MockWholeNumberProperty } from './mock-context';

export function getMockParameters(): IInputs {
    return {
        AccessibilityLabel: new MockStringProperty(),
        Theme: new MockStringProperty(),
        Min: new MockWholeNumberProperty(),
        Max: new MockWholeNumberProperty(),
        Step: new MockWholeNumberProperty(),
        Label: new MockStringProperty(),
        IconName: new MockStringProperty(),
        Default: new MockStringProperty(),
    };
}