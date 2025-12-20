"use client";
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Modal", {
    enumerable: true,
    get: function() {
        return Modal;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _classNames = require("../../../helpers/classNames");
const _useAppRootContext = require("../../../hooks/useAppRootContext");
const _vaul = require("vaul");
const _VisuallyHidden = require("../../Service/VisuallyHidden/VisuallyHidden");
const _ModalClose = require("./components/ModalClose/ModalClose");
const _ModalHeader = require("./components/ModalHeader/ModalHeader");
const _ModalOverlay = require("./components/ModalOverlay/ModalOverlay");
const Modal = /*#__PURE__*/ (0, _react.forwardRef)((_param, ref)=>{
    var { overlayComponent = /*#__PURE__*/ (0, _jsxruntime.jsx)(_ModalOverlay.ModalOverlay, {}), open, onOpenChange, header, className, children, nested, trigger, closeThreshold, scrollLockTimeout, snapPoints, fadeFromIndex, modal, preventScrollRestoration, dismissible, handleOnly } = _param, restProps = _object_without_properties._(_param, [
        "overlayComponent",
        "open",
        "onOpenChange",
        "header",
        "className",
        "children",
        "nested",
        "trigger",
        "closeThreshold",
        "scrollLockTimeout",
        "snapPoints",
        "fadeFromIndex",
        "modal",
        "preventScrollRestoration",
        "dismissible",
        "handleOnly"
    ]);
    var _container_portalContainer;
    const container = (0, _useAppRootContext.useAppRootContext)();
    const [portal, setPortal] = (0, _react.useState)((_container_portalContainer = container.portalContainer) === null || _container_portalContainer === void 0 ? void 0 : _container_portalContainer.current);
    // This is internal optimization for AppRoot
    // React sets ref to normal value only after the first render
    // If we will have this logic inside the AppRoot component, then all tree will be re-rendered
    (0, _react.useEffect)(()=>{
        var _container_portalContainer;
        setPortal((_container_portalContainer = container.portalContainer) === null || _container_portalContainer === void 0 ? void 0 : _container_portalContainer.current);
    }, [
        container.portalContainer
    ]);
    const Component = nested ? _vaul.Drawer.NestedRoot : _vaul.Drawer.Root;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(Component, {
        open: open,
        onOpenChange: onOpenChange,
        closeThreshold: closeThreshold,
        scrollLockTimeout: scrollLockTimeout,
        snapPoints: snapPoints,
        fadeFromIndex: fadeFromIndex,
        modal: modal,
        preventScrollRestoration: preventScrollRestoration,
        dismissible: dismissible,
        handleOnly: handleOnly,
        disablePreventScroll: true,
        repositionInputs: false,
        children: [
            trigger && /*#__PURE__*/ (0, _jsxruntime.jsx)(_vaul.Drawer.Trigger, {
                asChild: true,
                children: trigger
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_vaul.Drawer.Portal, {
                container: portal,
                children: [
                    overlayComponent,
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_vaul.Drawer.Content, _object_spread_props._(_object_spread._({
                        ref: ref,
                        className: (0, _classNames.classNames)("tgui-cc76354712c6e8d9", className)
                    }, restProps), {
                        "aria-describedby": "modal-content",
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_vaul.Drawer.Title, {})
                            }),
                            handleOnly && /*#__PURE__*/ (0, _jsxruntime.jsx)(_vaul.Drawer.Handle, {
                                style: {
                                    background: "transparent",
                                    width: "100%",
                                    height: 28,
                                    margin: 0,
                                    marginBottom: -28,
                                    zIndex: 10
                                }
                            }),
                            header,
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                className: "tgui-5dc6ad1ca3ac3ed4",
                                children: children
                            })
                        ]
                    }))
                ]
            })
        ]
    });
});
Modal.Header = _ModalHeader.ModalHeader;
Modal.Overlay = _ModalOverlay.ModalOverlay;
Modal.Close = _ModalClose.ModalClose;

//# sourceMappingURL=Modal.js.map