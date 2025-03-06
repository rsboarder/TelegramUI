"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RootRenderer", {
    enumerable: true,
    get: function() {
        return RootRenderer;
    }
});
const _react = require("react");
const _reactdom = require("react-dom");
const _useAppRootContext = require("../../../hooks/useAppRootContext");
const RootRenderer = ({ children, customContainer })=>{
    const { portalContainer } = (0, _useAppRootContext.useAppRootContext)();
    // Use customContainer if provided, otherwise fall back to portalContainer from context
    const targetContainer = customContainer || (portalContainer === null || portalContainer === void 0 ? void 0 : portalContainer.current);
    if (!targetContainer) {
        return /*#__PURE__*/ (0, _react.isValidElement)(children) ? children : null;
    }
    return /*#__PURE__*/ (0, _reactdom.createPortal)(children, targetContainer);
};

//# sourceMappingURL=RootRenderer.js.map