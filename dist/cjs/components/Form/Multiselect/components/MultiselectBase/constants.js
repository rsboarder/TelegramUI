"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderChipDefault", {
    enumerable: true,
    get: function() {
        return renderChipDefault;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _Chip = require("../../../Chip/Chip");
const renderChipDefault = (props)=>{
    const { onClick, onMouseDown } = props, rest = _object_without_properties._(props, [
        "onClick",
        "onMouseDown"
    ]);
    // Create a wrapper for the onClick handler
    const handleClick = (e)=>{
        // Prevent default behavior and stop propagation
        e.preventDefault();
        e.stopPropagation();
        // Call the original onClick if provided
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
    };
    // Create a wrapper for the onMouseDown handler
    const handleMouseDown = (e)=>{
        // Prevent default behavior and stop propagation
        e.preventDefault();
        e.stopPropagation();
        // Call the original onMouseDown if provided
        onMouseDown === null || onMouseDown === void 0 ? void 0 : onMouseDown(e);
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Chip.Chip, _object_spread._({
        mode: "mono",
        onClick: handleClick,
        onMouseDown: handleMouseDown
    }, rest));
};

//# sourceMappingURL=constants.js.map