/* istanbul ignore file */

import { IInputs } from '../generated/ManifestTypes';
import { MockEnumProperty, MockStringProperty, MockWholeNumberProperty, MockDecimalNumberProperty, MockTwoOptionsProperty } from './mock-context';

export function getMockParameters(): IInputs {
    return {
        Theme: new MockStringProperty(),
        AccessibilityLabel: new MockStringProperty()
    };
}
