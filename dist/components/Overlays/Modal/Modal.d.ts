import { ForwardRefExoticComponent, HTMLAttributes, ReactNode, RefAttributes } from "react";
import { Drawer } from "vaul";
import { ModalClose } from "./components/ModalClose/ModalClose";
import { ModalHeader } from "./components/ModalHeader/ModalHeader";
export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "onAnimationEnd"> {
    /** Controls the displayed state of the modal, enabling external management. */
    open?: boolean;
    /** Callback fired upon state change, facilitating open/close state synchronization. */
    onOpenChange?: (open: boolean) => void;
    /** Custom header component to display at the top of the modal. */
    header?: ReactNode;
    /** Custom component for the modal's overlay backdrop. */
    overlayComponent?: ReactNode;
    /** Component or element used to trigger the modal's visibility. */
    trigger?: ReactNode;
    /** Enables nesting within another drawer component, allowing for hierarchical structures. */
    nested?: boolean;
    /** Threshold for swipe actions to trigger modal closure, expressed as a decimal between 0 and 1. */
    closeThreshold?: number;
    /** Debounce duration after scrolling within the modal before it can be closed through swipe actions. */
    scrollLockTimeout?: number;
    /** Governs interaction with background elements when the modal is open. */
    modal?: boolean;
    /** Prevents automatic scroll position restoration when the modal closes, preserving user context. */
    preventScrollRestoration?: boolean;
    /** Defines snap points for modal positioning, supporting percentages of screen height or pixel values. */
    snapPoints?: (number | string)[];
    /** Snap point index at which the overlay begins to fade, enhancing visual cues for modal depth. */
    fadeFromIndex?: never;
    /** Determines if the modal can be closed by user interactions */
    dismissible?: boolean;
    /** Prevents the modal from preventing scroll when opened */
    disablePreventScroll?: boolean;
}
type ModalWithComponents = ForwardRefExoticComponent<ModalProps & RefAttributes<HTMLDivElement>> & {
    Header: typeof ModalHeader;
    Overlay: typeof Drawer.Overlay;
    Close: typeof ModalClose;
};
/**
 * Modal component, providing a flexible dialog framework with customizable content and interaction models.
 * It leverages the Drawer component from 'vaul' for its base functionality, enhanced with additional properties
 * and behaviors specific to modal dialogues, such as overlay management and nested modals.
 */
export declare const Modal: ModalWithComponents;
export {};
//# sourceMappingURL=Modal.d.ts.map