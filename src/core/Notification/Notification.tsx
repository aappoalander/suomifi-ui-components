import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  HtmlDiv,
  HtmlDivWithRef,
  HtmlButton,
  HtmlButtonProps,
  HtmlDivWithRefProps,
} from '../../reset';
import { hLevels } from '../../reset/HtmlH/HtmlH';
import { getConditionalAriaProp } from '../../utils/aria';
import { Icon } from '../Icon/Icon';
import { Heading } from '../Heading/Heading';
import { AutoId } from '../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { baseStyles } from './Notification.baseStyles';

export const baseClassName = 'fi-notification';
export const notificationClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
  content: `${baseClassName}_content`,
  contentWrapper: `${baseClassName}_contentWrapper`,
  heading: `${baseClassName}_heading`,
  textContentWrapper: `${baseClassName}_text-content-wrapper`,
  icon: `${baseClassName}_icon`,
  iconWrapper: `${baseClassName}_icon-wrapper`,
  closeButton: `${baseClassName}_close-button`,
  smallScreen: `${baseClassName}--small-screen`,
  actionElementWrapper: `${baseClassName}_action-element-wrapper`,
};

export interface NotificationProps extends HtmlDivWithRefProps {
  /** Style variant. Affects color and icon used.
   * @default 'neutral'
   */
  status?: 'neutral' | 'error';
  /** Heading for the Notification */
  headingText?: string;
  /** Main content of the Notification */
  children?: ReactNode;
  /** Elements to be rendered under the notification text. Can be e.g. buttons, links etc. */
  actionElements?: ReactNode;
  /** Heading variant for Notification.
   * @default 'h2'
   */
  headingVariant?: Exclude<hLevels, 'h1'>;
  /** Text to label the close button. Visible + `aria-label` in regular size and only used as `aria-label` in small screen variant */
  closeText: string;
  /** Click handler for the close button */
  onCloseButtonClick?: () => void;
  /** Custom props passed to the close button */
  closeButtonProps?: Omit<HtmlButtonProps, 'onClick'>;
  /** Use small screen styling */
  smallScreen?: boolean;
  /** Label for the notification region for screen reader users.
   * If one is not provided, `headingText` or finally notification content will be used as the label.
   */
  regionAriaLabel?: string;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

class BaseNotification extends Component<NotificationProps & InnerRef> {
  render() {
    const {
      className,
      status = 'neutral',
      headingText,
      children,
      id,
      actionElements,
      closeText,
      onCloseButtonClick,
      smallScreen,
      closeButtonProps = {},
      headingVariant = 'h2',
      style,
      regionAriaLabel,
      ...passProps
    } = this.props;

    const {
      className: customCloseButtonClassName,
      'aria-describedby': closeButtonPropsAriaDescribedBy,
      'aria-label': closeButtonPropsAriaLabel,
      ...closeButtonPassProps
    } = closeButtonProps;
    const variantIcon = status === 'neutral' ? 'info' : 'error';

    return (
      <HtmlDivWithRef
        as="section"
        role="region"
        aria-label={regionAriaLabel || headingText || children}
        {...passProps}
        className={classnames(
          baseClassName,
          `${baseClassName}--${status}`,
          className,
          {
            [notificationClassNames.smallScreen]: !!smallScreen,
          },
        )}
      >
        <HtmlDiv className={notificationClassNames.styleWrapper} style={style}>
          <HtmlDiv className={notificationClassNames.iconWrapper}>
            <Icon icon={variantIcon} className={notificationClassNames.icon} />
          </HtmlDiv>

          <HtmlDiv
            className={notificationClassNames.textContentWrapper}
            id={id}
          >
            <HtmlDiv className={notificationClassNames.content}>
              {headingText && (
                <Heading
                  variant={headingVariant}
                  className={notificationClassNames.heading}
                >
                  {headingText}
                </Heading>
              )}
              <HtmlDiv className={notificationClassNames.contentWrapper}>
                {children}
              </HtmlDiv>
            </HtmlDiv>
          </HtmlDiv>
          <HtmlButton
            className={classnames(
              notificationClassNames.closeButton,
              customCloseButtonClassName,
            )}
            {...getConditionalAriaProp('aria-label', [
              closeButtonPropsAriaLabel ||
                (smallScreen ? closeText : undefined),
            ])}
            {...getConditionalAriaProp('aria-describedby', [
              closeButtonPropsAriaDescribedBy,
            ])}
            onClick={onCloseButtonClick}
            {...closeButtonPassProps}
          >
            {!smallScreen ? closeText : ''}
            <Icon icon="close" />
          </HtmlButton>
        </HtmlDiv>
        {actionElements && (
          <HtmlDiv className={notificationClassNames.actionElementWrapper}>
            {actionElements}
          </HtmlDiv>
        )}
      </HtmlDivWithRef>
    );
  }
}

const StyledNotification = styled(
  (props: NotificationProps & InnerRef & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseNotification {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const Notification = forwardRef(
  (props: NotificationProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledNotification
                forwardedRef={ref}
                theme={suomifiTheme}
                id={id}
                {...passProps}
              />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  },
);

Notification.displayName = 'Notification';
export { Notification };
