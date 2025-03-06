import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Each path wrapped in symbol for correct animation inside children in Safari */ export const IconMedium = (_param)=>{
    var { children } = _param, restProps = _object_without_properties(_param, [
        "children"
    ]);
    return /*#__PURE__*/ _jsxs("svg", _object_spread_props(_object_spread({
        width: "36",
        height: "36",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: [
            /*#__PURE__*/ _jsx("use", {
                xlinkHref: "#spinner_36",
                fill: "none",
                children: children
            }),
            /*#__PURE__*/ _jsx("symbol", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 36 36",
                id: "spinner_36",
                children: /*#__PURE__*/ _jsx("path", {
                    d: "M18 4c2.4335 0 4.825.63432 6.9386 1.84041S28.815 8.7827 30.053 10.8778c1.238 2.0951 1.9085 4.4766 1.9454 6.9099.0369 2.4332-.5611 4.8341-1.735 6.9657-1.1739 2.1317-2.8831 3.9205-4.9592 5.1902-2.0761 1.2696-4.4472 1.9762-6.8796 2.05-2.4324.0738-4.842-.4877-6.9913-1.6292-2.14918-1.1414-3.96375-2.8234-5.26472-4.8799",
                    stroke: "currentColor",
                    strokeWidth: "3",
                    strokeLinecap: "round"
                })
            })
        ]
    }));
};

//# sourceMappingURL=medium.js.map