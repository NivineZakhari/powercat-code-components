/**
 * @license Copyright (c) Microsoft Corporation. All rights reserved.
 */

import * as React from 'react';
import { SpinButton, ThemeProvider, createTheme, IPartialTheme, IIconProps, mergeStyles } from '@fluentui/react/lib'
import { ISpinButtonComponentProps } from './Component.types';

export const SpinButtonComponent = React.memo((props: ISpinButtonComponentProps) => {
  const { themeJSON, onChanged } = props;
  const icon: IIconProps = { iconName: props.iconName };

  /* Helper method catches the updated value from the control */
  const onChange = (event?: React.ChangeEvent<HTMLInputElement>, newValue?: string): void => {
    onChanged(newValue);
  };

  /* Helper method applies theme */
  const theme = getTheme(themeJSON);

  return (
    <ThemeProvider theme={theme}>
      <SpinButton {...props} />
    </ThemeProvider>
  );
});

SpinButtonComponent.displayName = 'SpinButtonComponent';

/**
 * Generates the theme from user input
 */
function getTheme(themeJSON?: string) {
  return React.useMemo(() => {
    try {
      return themeJSON ? createTheme(JSON.parse(themeJSON) as IPartialTheme) : undefined;
    } catch (ex) {
      /* istanbul ignore next */
      console.error('Cannot parse theme', ex);
    }
  }, [themeJSON]);
}