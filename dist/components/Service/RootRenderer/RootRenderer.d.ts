import { ReactNode } from "react";
export interface RootRendererProps {
    children?: ReactNode;
    /** Optional custom container to render the portal into, overrides the default from context */
    customContainer?: HTMLElement | null;
}
export declare const RootRenderer: ({ children, customContainer, }: RootRendererProps) => import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | null;
//# sourceMappingURL=RootRenderer.d.ts.map