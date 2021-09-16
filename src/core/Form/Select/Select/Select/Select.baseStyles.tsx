import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font } from '../../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-select {
    ${font(theme)('bodyText')}
    width: 290px;

    & .fi-filter-input_input {
      padding-right: 38px;
    }

    &--value-selected {
      & .fi-filter-input_input {
        padding-right: 75px;
      }
    }
  }

  &.fi-select--open {
    & .fi-filter-input_input {
      border-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;
