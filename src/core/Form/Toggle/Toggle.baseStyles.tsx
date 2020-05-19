import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { focus } from '../../theme/utils';
import { element, font } from '../../theme/reset';

// Contains double underscore because it is written in the SVG-file
const svgPrefix = 'icon-toggle_svg__';
const iconWidth = '40px';
const iconHeight = '24px';

/* stylelint-disable no-descending-specificity */
export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}
    background-color: ${theme.colors.whiteBase};
    padding-left: 50px;
    position: relative;
    display: inline-block;

    & .fi-toggle_icon-container {
      position: absolute;
      margin-right: ${theme.spacing.insetL};
      left: 0;
      top: 2px;
      padding-right: 2px;
      padding-left: 2px;
    }

    & + .fi-toggle--with-button {
      &:focus {
        outline: 0;
        & .fi-toggle_icon-container {
          ${focus({ theme, noPseudo: true })}
          position: absolute;
          &:after {
            border-radius: 14px;
          }
        }
      }
      &:focus:not(:focus-visible) {
        outline: 0;
        & .fi-toggle_icon-container {
          &:after {
            content: none;
          }
        }
      }
    }

    & + .fi-toggle--with-input {
      &:focus-within {
        outline: 0;
        & .fi-toggle_icon-container {
          ${focus({ theme, noPseudo: true })}
          position: absolute;
          &:after {
            border-radius: 14px;
          }
        }
      }
      &:focus-within:not(:focus-visible) {
        outline: 0;
        & .fi-toggle_icon-container {
          &:after {
            content: none;
          }
        }
      }
    }

    & > .fi-toggle_input {
      ${element({ theme })}
      ${font({ theme })('bodyText')}
      position: absolute;
      width: ${iconWidth};
      height: ${iconHeight};
      opacity: 0;
      z-index: -9999;
      background-color: ${theme.colors.whiteBase};
    }

    & .fi-toggle_icon {
      width: ${iconWidth};
      height: ${iconHeight};
      vertical-align: bottom;
      overflow: visible;
      transform: translateY(-0.05em);
    
      & .${svgPrefix}fi-toggle-icon-knob {
        transform: translateX(0%);
      }
      .${svgPrefix}fi-toggle-icon-circle {
          fill: ${theme.colors.whiteBase};
        }
      & .${svgPrefix}fi-toggle-icon-slide {
        transform: translateY(1px);
      }
      &.fi-toggle_icon--disabled {
        .${svgPrefix}fi-toggle-icon-circle {
          fill: ${theme.colors.depthLight3};
        }
        & .${svgPrefix}fi-toggle-icon-slide {
          fill: ${theme.colors.depthLight2};
        }
      }
      &.fi-toggle_icon--checked {
        .${svgPrefix}fi-toggle-icon-knob {
          transform: translateX(55%);
        }
        .${svgPrefix}fi-toggle-icon-slide {
          fill: ${theme.colors.successSecondary};
        }
        .${svgPrefix}fi-toggle-icon-circle {
          fill: ${theme.colors.successBase};
        }
        &.fi-toggle_icon--disabled {
        .${svgPrefix}fi-toggle-icon-circle {
          fill: ${theme.colors.successSecondary};
          }
        }
      }
    }
`,
);
