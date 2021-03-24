import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = css`
  &.fi-combobox-item {
    &:focus {
      outline: none;
    }

    &--currentSelection {
      outline: 0;
      position: relative;

      & .fi-checkbox {
        background-color: ${theme.colors.highlightBase};
        color: ${theme.colors.whiteBase};

        & mark {
          color: ${theme.colors.whiteBase};
        }
      }
    }

    & .fi-checkbox {
      padding: 10px;
      user-select: none;
      ${font(theme)('actionElementInnerText')}

      & mark {
        background-color: transparent;
        font-weight: bold;
      }

      & .fi-checkbox_icon {
        pointer-events: none;
      }
    }

    & .fi-checkbox--checked {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};

      & mark {
        color: ${theme.colors.whiteBase};
      }
    }

    &:hover {
      & .fi-checkbox {
        background-color: ${theme.colors.highlightBase};
        color: ${theme.colors.whiteBase};
        & mark {
          color: ${theme.colors.whiteBase};
        }
      }
    }
  }

  & .fi-combobox-item_wrapper {
    display: inline-block;
    width: 100%;
  }
`;
