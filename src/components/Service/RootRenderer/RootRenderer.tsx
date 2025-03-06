import { isValidElement, ReactNode } from "react";
import { createPortal } from "react-dom";

import { useAppRootContext } from "hooks/useAppRootContext";

export interface RootRendererProps {
  children?: ReactNode;
  /** Optional custom container to render the portal into, overrides the default from context */
  customContainer?: HTMLElement | null;
}

export const RootRenderer = ({
  children,
  customContainer,
}: RootRendererProps) => {
  const { portalContainer } = useAppRootContext();

  // Use customContainer if provided, otherwise fall back to portalContainer from context
  const targetContainer = customContainer || portalContainer?.current;

  if (!targetContainer) {
    return isValidElement(children) ? children : null;
  }

  return createPortal(children, targetContainer);
};
