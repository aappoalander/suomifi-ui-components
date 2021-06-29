import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets, resetWithSelectors } from '../utils';
import { asPropType } from '../../utils/typescript';
export interface HtmlInputProps
  extends Omit<HTMLProps<HTMLInputElement>, 'ref' | 'as'> {
  as?: asPropType;
  /**
   * HTML Input type
   * @default text
   */
  type?: string;
  /** Ref object for the input element */
  forwardedRef?: React.RefObject<HTMLInputElement>;
}

const inputResets = css`
  ${resets.normalize.html}
  ${resets.normalize.input}
  ${resetWithSelectors(['::-webkit-input-placeholder'])}
  ${resets.common}
  display: inline-block;
  max-width: 100%;
`;

const Input = ({ type, forwardedRef, ...passProps }: HtmlInputProps) => (
  <input {...passProps} type={!!type ? type : 'text'} ref={forwardedRef} />
);

export const HtmlInput = styled(Input)`
  ${inputResets}
`;
