import { ArrowOptions, Middleware } from "@floating-ui/react-dom";
import { PlacementWithAuto } from "./types";
export interface UseFloatingMiddlewaresOptions {
    /** By default, the component will automatically choose the best placement */
    placement?: PlacementWithAuto;
    /** Offset along the main axis. */
    offsetByMainAxis?: number;
    /** Offset along the cross axis. */
    offsetByCrossAxis?: number;
    /** Ref for arrow element */
    arrowRef?: ArrowOptions["element"];
    /** Whether to display an arrow pointing to the anchor element. */
    withArrow?: boolean;
    /** The height of the arrow. This is added to `mainAxis` to prevent the arrow from overlapping the anchor element. */
    arrowHeight?: number;
    /** A safe zone around the arrow to prevent it from exceeding the content bounds. */
    arrowPadding?: number;
    /** Sets the width to match the target element. */
    sameWidth?: boolean;
    /** An array of custom modifiers for Popper (should be memoized). */
    customMiddlewares?: Middleware[];
}
export declare const useFloatingMiddlewares: ({ placement, arrowRef, withArrow, arrowHeight, arrowPadding, sameWidth, offsetByMainAxis, offsetByCrossAxis, customMiddlewares, }: UseFloatingMiddlewaresOptions) => {
    middlewares: {
        name: string;
        options?: any;
        fn: (state: import("@floating-ui/react-dom").MiddlewareState) => import("@floating-ui/react-dom").MiddlewareReturn | Promise<import("@floating-ui/react-dom").MiddlewareReturn>;
    }[];
    strictPlacement: import("@floating-ui/react-dom").Placement | undefined;
};
//# sourceMappingURL=useFloatingMiddlewares.d.ts.map