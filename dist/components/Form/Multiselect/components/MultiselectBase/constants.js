import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { Chip } from "../../../Chip/Chip";
export const renderChipDefault = (props)=>{
    const { onClick, onMouseDown } = props, rest = _object_without_properties(props, [
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
    return /*#__PURE__*/ _jsx(Chip, _object_spread({
        mode: "mono",
        onClick: handleClick,
        onMouseDown: handleMouseDown
    }, rest));
};

//# sourceMappingURL=constants.js.map