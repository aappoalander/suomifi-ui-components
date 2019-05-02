import React, { Component } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { ThemeComponent, ThemeProp } from '../theme';
import { withDefaultTheme } from '../theme/utils/defaultTheme';
import { baseStyles, unStyled } from './Button.baseStyles';
import {
  Button as CompButton,
  ButtonProps as CompButtonProps,
} from '../../components/Button/Button';
import { Icon, IconProps, IconKeys } from '../Icon/Icon';

type ButtonVariant =
  | 'default'
  | 'negative'
  | 'secondary'
  | 'secondary-noborder'
  | 'tertiary'
  | 'unstyled';

export interface ButtonProps extends CompButtonProps, ThemeComponent {
  /**
   * Set width to grow all available space
   */
  fullWidth?: boolean;
  /**
   * 'default' | 'negative' | 'secondary' | 'secondary-noborder' | 'tertiary'
   * @default default
   */
  variant?: ButtonVariant;
  /**
   * Icon from suomifi-theme
   */
  icon?: IconKeys;
  /**
   * Icon from suomifi-theme to be placed on right side
   */
  iconRight?: IconKeys;
  /**
   * Properties given to Icon-component
   */
  iconProps?: IconProps;
}

const baseClassName = 'fi-button';
const iconClassName = `${baseClassName}-icon`;
const iconRightClassName = `${baseClassName}-icon--right`;

const StyledButton = styled(
  ({
    theme,
    fullWidth,
    variant,
    className,
    ...passProps
  }: ButtonProps & { right?: boolean }) => (
    <CompButton
      {...passProps}
      className={classnames(className, baseClassName)}
    />
  ),
)`
  ${props => baseStyles(props)}
`;

const iconColor = ({
  theme,
  invert,
  disabled,
}: {
  theme?: ThemeProp;
  invert?: boolean;
  disabled?: boolean;
}) => {
  if (!!theme) {
    const defaultColor = !!disabled
      ? theme.colors.depthBase
      : theme.colors.whiteBase;
    const secondaryColor = !!disabled
      ? theme.colors.depthBase
      : theme.colors.highlightBase;
    return !!invert ? secondaryColor : defaultColor;
  }
  return undefined;
};

const UnstyledButton = styled((props: ButtonProps) => {
  const {
    className,
    fullWidth: dissmissFullWidth,
    variant: dissmissVariant,
    icon: dismissIcon,
    iconRight: dissmissIconRight,
    ...passProps
  } = props;
  return (
    <CompButton
      {...passProps}
      className={classnames(className, baseClassName)}
    />
  );
})`
  ${props => unStyled(props)}
`;

class ButtonWithIcon extends Component<ButtonProps> {
  render() {
    const { icon, iconRight, iconProps = {}, ...passProps } = withDefaultTheme(
      this.props,
    );
    const { theme, disabled, variant } = passProps;
    const { className: iconPropsClassName, ...passIconProps } = iconProps;

    if (variant === 'unstyled') {
      return <UnstyledButton {...passProps} />;
    }

    const secondaryOrTertiary =
      !!variant &&
      (variant === 'secondary' ||
        variant === 'secondary-noborder' ||
        variant === 'tertiary');
    return (
      <StyledButton {...passProps}>
        {!!icon && (
          <Icon
            icon={icon}
            color={iconColor({ theme, disabled, invert: secondaryOrTertiary })}
            className={classnames(iconClassName, iconPropsClassName)}
            {...passIconProps}
          />
        )}
        {passProps.children}
        {!!iconRight && (
          <Icon
            icon={iconRight}
            color={iconColor({ theme, disabled, invert: secondaryOrTertiary })}
            className={classnames(
              iconClassName,
              iconRightClassName,
              iconPropsClassName,
            )}
            {...passIconProps}
          />
        )}
      </StyledButton>
    );
  }
}

/**
 * Use for inside Application onClick events.<br />
 * When using Button.secondaryNoborder with other than white background,<br />
 * define styles background color for all needed states (:hover, :active, :disabled)
 */
export class Button extends Component<ButtonProps> {
  static negative = (props: ButtonProps) => {
    return <ButtonWithIcon {...props} variant="negative" />;
  };

  static secondary = (props: ButtonProps) => {
    return <ButtonWithIcon {...props} variant="secondary" />;
  };

  static secondaryNoborder = (props: ButtonProps) => {
    return <ButtonWithIcon {...props} variant="secondary-noborder" />;
  };

  static tertiary = (props: ButtonProps) => {
    return <ButtonWithIcon {...props} variant="tertiary" />;
  };

  static unstyled = (props: ButtonProps) => {
    return <ButtonWithIcon {...props} variant="unstyled" />;
  };

  render() {
    return <ButtonWithIcon {...this.props} />;
  }
}
