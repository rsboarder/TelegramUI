"use client";

import {
  ElementType,
  forwardRef,
  HTMLAttributes,
  RefObject,
  useState,
} from "react";
import styles from "./Popper.module.css";

import { classNames } from "helpers/classNames";
import { multipleRef } from "helpers/react/refs";
import { useEnhancedEffect } from "hooks/useEnhancedEffect";

import { useFloating, VirtualElement } from "@floating-ui/react-dom";

import { RootRenderer } from "components/Service/RootRenderer/RootRenderer";
import {
  FloatingArrow,
  FloatingArrowProps,
} from "./components/FloatingArrow/FloatingArrow";
import {
  DEFAULT_ARROW_HEIGHT,
  DEFAULT_ARROW_PADDING,
} from "./components/FloatingArrow/icons/arrow";
import { autoUpdateFloatingElement } from "./helpers/autoUpdateFloatingElement";
import {
  useFloatingMiddlewares,
  UseFloatingMiddlewaresOptions,
} from "./hooks/useFloatingMiddlewares";

export interface PopperProps
  extends Omit<
      UseFloatingMiddlewaresOptions,
      "arrowHeight" | "arrowPadding" | "arrowRef"
    >,
    HTMLAttributes<HTMLDivElement> {
  /** Reference to the target element or virtual element for precise positioning. */
  targetRef: RefObject<HTMLElement> | VirtualElement;
  /** Configuration and customization options for the floating arrow component. */
  arrowProps?: FloatingArrowProps & {
    /** Optionally override the default arrow height. */
    height?: number;
    /** Optionally override the default arrow padding. */
    padding?: number;
  };
  /** Optional custom component for the arrow icon, replacing the default. */
  ArrowIcon?: FloatingArrowProps["Icon"] | null;
  /** Defines the root element type of the Popper, allowing for semantic customization. */
  Component?: ElementType;
  /** Opt-in feature to automatically update Popper's position when the target element resizes. */
  autoUpdateOnTargetResize?: boolean;
  /** Optional custom container to render the portal into, overrides the default from context */
  portalContainer?: HTMLElement | null;
}

/**
 * Renders a Popper component, leveraging floating UI for dynamic, responsive positioning.
 * Supports advanced configurations like virtual elements, custom arrows, and auto-position updates.
 */
export const Popper = forwardRef(
  (
    {
      // UseFloatingMiddlewaresOptions
      placement = "auto",
      sameWidth,
      offsetByMainAxis = 8,
      offsetByCrossAxis = 0,
      withArrow = true,
      customMiddlewares,

      // UseFloatingProps
      autoUpdateOnTargetResize = false,

      // ArrowProps
      arrowProps,
      ArrowIcon,

      Component = "div",
      style,
      targetRef,
      className,
      children,
      portalContainer,
      ...restProps
    }: PopperProps,
    ref
  ) => {
    const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);

    const { strictPlacement, middlewares } = useFloatingMiddlewares({
      placement,
      sameWidth,
      withArrow,
      arrowRef,
      arrowHeight: arrowProps?.height || DEFAULT_ARROW_HEIGHT,
      arrowPadding: arrowProps?.padding || DEFAULT_ARROW_PADDING,
      offsetByMainAxis,
      offsetByCrossAxis,
      customMiddlewares,
    });

    const {
      placement: resolvedPlacement,
      refs,
      middlewareData,
      floatingStyles,
    } = useFloating({
      placement: strictPlacement,
      middleware: middlewares,
      whileElementsMounted(...args) {
        return autoUpdateFloatingElement(...args, {
          elementResize: autoUpdateOnTargetResize,
        });
      },
    });

    // Debug logging for placement resolution with platform detection
    useEnhancedEffect(() => {
      if (process.env.NODE_ENV === 'development') {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        console.log('[Popper Debug] Platform info:', {
          userAgent: navigator.userAgent,
          isIOS,
          isMobile,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
          screenHeight: window.screen.height,
          availHeight: window.screen.availHeight,
        });
        
        console.log('[Popper Debug] Placement:', {
          initial: placement,
          strict: strictPlacement,
          resolved: resolvedPlacement,
        });
        
        console.log('[Popper Debug] Middleware data:', middlewareData);
        console.log('[Popper Debug] Floating styles:', floatingStyles);
        
        // Log autoPlacement details
        if (middlewareData.autoPlacement) {
          console.log('[Popper Debug] AutoPlacement:', {
            index: middlewareData.autoPlacement.index,
            overflowsCount: middlewareData.autoPlacement.overflows?.length,
            overflows: middlewareData.autoPlacement.overflows,
          });
        }
        
        // Log reference and floating element dimensions
        if (refs.reference && refs.floating) {
          const refRect = (refs.reference as any).getBoundingClientRect?.();
          const floatRect = (refs.floating as any).getBoundingClientRect?.();
          if (refRect && floatRect) {
            console.log('[Popper Debug] Element positions:', {
              reference: refRect,
              floating: floatRect,
              spaceAbove: refRect.top,
              spaceBelow: window.innerHeight - refRect.bottom,
              dropdownHeight: floatRect.height,
              shouldGoUp: floatRect.height > (window.innerHeight - refRect.bottom),
            });
          }
        }
      }
    }, [placement, strictPlacement, resolvedPlacement, middlewareData, floatingStyles, refs]);

    useEnhancedEffect(() => {
      refs.setReference("current" in targetRef ? targetRef.current : targetRef);
    }, [refs.setReference, targetRef]);

    return (
      <RootRenderer customContainer={portalContainer}>
        <Component
          {...restProps}
          ref={multipleRef(ref, refs.setFloating)}
          style={{ ...style, ...floatingStyles }}
          className={classNames(styles.wrapper, className)}
        >
          {withArrow && (
            <FloatingArrow
              {...arrowProps}
              coords={middlewareData.arrow}
              placement={resolvedPlacement}
              ref={setArrowRef}
              {...(ArrowIcon ? { Icon: ArrowIcon } : {})}
            />
          )}
          {children}
        </Component>
      </RootRenderer>
    );
  }
);
