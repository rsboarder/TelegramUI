'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAppRootContext", {
    enumerable: true,
    get: function() {
        return useAppRootContext;
    }
});
const _react = require("react");
const _AppRootContext = require("../components/Service/AppRoot/AppRootContext");
const DEFAULT_CONTEXT = {
    platform: 'base',
    appearance: 'light',
    portalContainer: {
        current: null
    },
    isRendered: false
};
const useAppRootContext = ()=>{
    const appRootContext = (0, _react.useContext)(_AppRootContext.AppRootContext);
    // Return default context when not inside AppRoot (e.g., inside portals)
    if (!appRootContext.isRendered) {
        return DEFAULT_CONTEXT;
    }
    return appRootContext;
};

//# sourceMappingURL=useAppRootContext.js.map