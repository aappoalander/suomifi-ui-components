import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SpacingWithoutInsetProp } from '../theme/utils/spacing';
import { baseStyles } from './Block.baseStyles';
import { HtmlDivWithRef, HtmlDivProps } from '../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';

const baseClassName = 'fi-block';

export interface BlockProps extends HtmlDivProps {
  /** Padding from theme */
  padding?: SpacingWithoutInsetProp;
  /** Margin from theme */
  margin?: SpacingWithoutInsetProp;
  /**
   * Change block semantics
   * @default default
   */
  variant?: 'default' | 'section' | 'header' | 'nav' | 'main' | 'footer';
}

interface InternalBlockProps extends BlockProps {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

class SemanticBlock extends Component<InternalBlockProps> {
  render() {
    const { className, variant, padding, margin, ...passProps } = this.props;
    const ComponentVariant =
      !variant || variant === 'default' ? HtmlDivWithRef : variant;

    return (
      <ComponentVariant
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--padding-${padding}`]: !!padding,
          [`${baseClassName}--margin-${margin}`]: !!margin,
          [`${baseClassName}--${variant}`]: !!variant,
        })}
      />
    );
  }
}

const StyledBlock = styled((props: InternalBlockProps & SuomifiThemeProp) => {
  const { theme, ...passProps } = props;
  return <SemanticBlock {...passProps} />;
})`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * Used displaying Block with correct styles
 */
export const Block = forwardRef(
  (props: BlockProps, ref: React.RefObject<HTMLDivElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledBlock theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);
