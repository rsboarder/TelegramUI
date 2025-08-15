"use client";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState } from "react";
import { classNames } from "../../../helpers/classNames";
import { multipleRef } from "../../../helpers/react/refs";
import { useEnhancedEffect } from "../../../hooks/useEnhancedEffect";
import { useFloating } from "@floating-ui/react-dom";
import { RootRenderer } from "../../Service/RootRenderer/RootRenderer";
import { FloatingArrow } from "./components/FloatingArrow/FloatingArrow";
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_PADDING } from "./components/FloatingArrow/icons/arrow";
import { autoUpdateFloatingElement } from "./helpers/autoUpdateFloatingElement";
import { useFloatingMiddlewares } from "./hooks/useFloatingMiddlewares";
/**
 * Renders a Popper component, leveraging floating UI for dynamic, responsive positioning.
 * Supports advanced configurations like virtual elements, custom arrows, and auto-position updates.
 */ export const Popper = /*#__PURE__*/ forwardRef((_param, ref)=>{
    var { // UseFloatingMiddlewaresOptions
    placement = "auto", sameWidth, offsetByMainAxis = 8, offsetByCrossAxis = 0, withArrow = true, customMiddlewares, // UseFloatingProps
    autoUpdateOnTargetResize = false, // ArrowProps
    arrowProps, ArrowIcon, Component = "div", style, targetRef, className, children, portalContainer } = _param, restProps = _object_without_properties(_param, [
        "placement",
        "sameWidth",
        "offsetByMainAxis",
        "offsetByCrossAxis",
        "withArrow",
        "customMiddlewares",
        "autoUpdateOnTargetResize",
        "arrowProps",
        "ArrowIcon",
        "Component",
        "style",
        "targetRef",
        "className",
        "children",
        "portalContainer"
    ]);
    const [arrowRef, setArrowRef] = useState(null);
    const { strictPlacement, middlewares } = useFloatingMiddlewares({
        placement,
        sameWidth,
        withArrow,
        arrowRef,
        arrowHeight: (arrowProps === null || arrowProps === void 0 ? void 0 : arrowProps.height) || DEFAULT_ARROW_HEIGHT,
        arrowPadding: (arrowProps === null || arrowProps === void 0 ? void 0 : arrowProps.padding) || DEFAULT_ARROW_PADDING,
        offsetByMainAxis,
        offsetByCrossAxis,
        customMiddlewares
    });
    const { placement: resolvedPlacement, refs, middlewareData, floatingStyles } = useFloating({
        placement: strictPlacement,
        middleware: middlewares,
        whileElementsMounted (...args) {
            return autoUpdateFloatingElement(...args, {
                elementResize: autoUpdateOnTargetResize
            });
        }
    });
    // Debug logging for placement resolution with platform detection
    useEnhancedEffect(()=>{
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
                availHeight: window.screen.availHeight
            });
            console.log('[Popper Debug] Placement:', {
                initial: placement,
                strict: strictPlacement,
                resolved: resolvedPlacement
            });
            console.log('[Popper Debug] Middleware data:', middlewareData);
            console.log('[Popper Debug] Floating styles:', floatingStyles);
            // Log autoPlacement details
            if (middlewareData.autoPlacement) {
                var _middlewareData_autoPlacement_overflows;
                console.log('[Popper Debug] AutoPlacement:', {
                    index: middlewareData.autoPlacement.index,
                    overflowsCount: (_middlewareData_autoPlacement_overflows = middlewareData.autoPlacement.overflows) === null || _middlewareData_autoPlacement_overflows === void 0 ? void 0 : _middlewareData_autoPlacement_overflows.length,
                    overflows: middlewareData.autoPlacement.overflows
                });
            }
            // Log reference and floating element dimensions
            if (refs.reference && refs.floating) {
                var _refs_reference_getBoundingClientRect, _refs_reference, _refs_floating_getBoundingClientRect, _refs_floating;
                const refRect = (_refs_reference_getBoundingClientRect = (_refs_reference = refs.reference).getBoundingClientRect) === null || _refs_reference_getBoundingClientRect === void 0 ? void 0 : _refs_reference_getBoundingClientRect.call(_refs_reference);
                const floatRect = (_refs_floating_getBoundingClientRect = (_refs_floating = refs.floating).getBoundingClientRect) === null || _refs_floating_getBoundingClientRect === void 0 ? void 0 : _refs_floating_getBoundingClientRect.call(_refs_floating);
                if (refRect && floatRect) {
                    console.log('[Popper Debug] Element positions:', {
                        reference: refRect,
                        floating: floatRect,
                        spaceAbove: refRect.top,
                        spaceBelow: window.innerHeight - refRect.bottom,
                        dropdownHeight: floatRect.height,
                        shouldGoUp: floatRect.height > window.innerHeight - refRect.bottom
                    });
                }
            }
        }
    }, [
        placement,
        strictPlacement,
        resolvedPlacement,
        middlewareData,
        floatingStyles,
        refs
    ]);
    useEnhancedEffect(()=>{
        refs.setReference("current" in targetRef ? targetRef.current : targetRef);
    }, [
        refs.setReference,
        targetRef
    ]);
    return /*#__PURE__*/ _jsx(RootRenderer, {
        customContainer: portalContainer,
        children: /*#__PURE__*/ _jsxs(Component, _object_spread_props(_object_spread({}, restProps), {
            ref: multipleRef(ref, refs.setFloating),
            style: _object_spread({}, style, floatingStyles),
            className: classNames("tgui-e9c83f4f150e5513", className),
            children: [
                withArrow && /*#__PURE__*/ _jsx(FloatingArrow, _object_spread(_object_spread_props(_object_spread({}, arrowProps), {
                    coords: middlewareData.arrow,
                    placement: resolvedPlacement,
                    ref: setArrowRef
                }), ArrowIcon ? {
                    Icon: ArrowIcon
                } : {})),
                children
            ]
        }))
    });
});

//# sourceMappingURL=Popper.js.map