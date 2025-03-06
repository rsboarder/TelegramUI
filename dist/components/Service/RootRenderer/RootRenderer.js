import { isValidElement } from "react";
import { createPortal } from "react-dom";
import { useAppRootContext } from "../../../hooks/useAppRootContext";
export const RootRenderer = ({ children, customContainer })=>{
    const { portalContainer } = useAppRootContext();
    // Use customContainer if provided, otherwise fall back to portalContainer from context
    const targetContainer = customContainer || (portalContainer === null || portalContainer === void 0 ? void 0 : portalContainer.current);
    if (!targetContainer) {
        return /*#__PURE__*/ isValidElement(children) ? children : null;
    }
    return /*#__PURE__*/ createPortal(children, targetContainer);
};

//# sourceMappingURL=RootRenderer.js.map