import React, { useState, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useEnhancedEffect } from '../../utils/common';
import { HtmlDivProps, HtmlDivWithRef } from '../../reset/HtmlDiv/HtmlDiv';
export interface PopoverProps extends HtmlDivProps {
  sourceRef: React.RefObject<any>;
  children: ReactNode;
  portalStyleProps?: React.CSSProperties;
  placement?: 'top' | 'bottom';
  matchWidth?: boolean;
  allowFlip?: boolean;
  onClickOutside?: (event: MouseEvent) => void;
}

const sameWidth: any = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  /* eslint-disable no-param-reassign */
  fn({ state }: { state: any }) {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect({ state }: { state: any }) {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
  },
};

export const Popover = (props: PopoverProps) => {
  const {
    portalStyleProps = {},
    placement = 'bottom',
    allowFlip = false,
    matchWidth = true,
    children,
    sourceRef,
    onClickOutside,
    ...passProps
  } = props;

  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  const portalRef = useRef<HTMLDivElement>(null);

  const { styles } = usePopper(sourceRef.current, popperElement, {
    modifiers: [
      {
        name: 'flip',
        enabled: allowFlip,
      },
      matchWidth ? sameWidth : {},
    ],
    placement,
  });

  useEffect(() => {
    const globalClickHandler = (nativeEvent: MouseEvent) => {
      if (
        !portalRef.current?.contains(nativeEvent.target as Node) &&
        !sourceRef?.current?.contains(nativeEvent.target as Node) &&
        !!onClickOutside
      ) {
        onClickOutside(nativeEvent);
      }
    };

    document.addEventListener('click', globalClickHandler, {
      capture: true,
    });
    return () => {
      document.removeEventListener('click', globalClickHandler, {
        capture: true,
      });
    };
  }, [onClickOutside, sourceRef]);

  useEnhancedEffect(() => {
    setMountNode(window.document.body);
  });

  if (!mountNode) {
    return null;
  }
  return (
    <>
      {ReactDOM.createPortal(
        <div
          className={'fi-portal'}
          ref={setPopperElement}
          style={{ ...styles.popper, ...portalStyleProps }}
          tabIndex={-1}
          role="presentation"
        >
          <HtmlDivWithRef forwardedRef={portalRef} {...passProps}>
            {children}
          </HtmlDivWithRef>
        </div>,
        mountNode,
      )}
    </>
  );
};
