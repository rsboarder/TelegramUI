import { _ as _extends } from "@swc/helpers/_/_extends";
import { _ as _object_destructuring_empty } from "@swc/helpers/_/_object_destructuring_empty";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx } from "react/jsx-runtime";
export const IconMultiselectable = (_param)=>{
    var restProps = _extends({}, _object_destructuring_empty(_param));
    return /*#__PURE__*/ _jsx("svg", _object_spread_props(_object_spread({
        width: "20",
        height: "20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ _jsx("circle", {
            cx: "10",
            cy: "10",
            r: "9",
            stroke: "currentColor",
            strokeWidth: "2"
        })
    }));
};

//# sourceMappingURL=multiselectable.js.map