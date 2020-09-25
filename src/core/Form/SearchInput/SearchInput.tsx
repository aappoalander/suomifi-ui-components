import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { baseStyles } from './SearchInput.baseStyles';
import { baseStyles as inputBaseStyles } from '../TextInput/TextInput.baseStyles';
import { SearchInput as CompSearchInput } from '../../../components/Form/SearchInput';
import { TextInputProps, textInputClassNames } from '../TextInput/TextInput';
import { Icon } from '../../Icon/Icon';
import classnames from 'classnames';
import { Omit } from '../../../utils/typescript';

const baseClassName = 'fi-search-input';
const inputBaseClassName = `${baseClassName}_input`;
const iconBaseClassName = `${baseClassName}_icon`;

export interface SearchInputProps extends Omit<TextInputProps, 'status'> {}

const StyledTextInput = styled(
  ({
    tokens,
    className,
    labelTextProps = { className: undefined },
    inputContainerProps,
    ...passProps
  }: TextInputProps & InternalTokensProp) => (
    <CompSearchInput
      {...passProps}
      labelTextProps={{
        ...labelTextProps,
        className: classnames(
          labelTextProps.className,
          textInputClassNames.labelParagraph,
        ),
      }}
      inputContainerProps={{
        ...inputContainerProps,
        className: classnames(baseClassName, inputContainerProps?.className),
      }}
      className={classnames(className, inputBaseClassName)}
    />
  ),
)`
  ${(props) => inputBaseStyles(props)}
  ${(props) => baseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting search text
 */
export class SearchInput extends Component<SearchInputProps> {
  render() {
    return (
      <StyledTextInput {...withSuomifiDefaultProps(this.props)}>
        <Icon icon="search" className={iconBaseClassName} />
      </StyledTextInput>
    );
  }
}
